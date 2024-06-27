import { createStore } from "vuex";
import sourceData from "@/data.json";
import { findById, upsert } from "@/helpers/index";

const store = createStore({
  state() {
    return {
      sourceData,
      authId: "jUjmgCurRRdzayqbRMO7aTG9X1G2",
    };
  },
  getters: {
    authUser: (state) => {
      const user = findById(state.sourceData.users, state.authId);
      if (!user) return null;

      return {
        ...user,
        // authUser.posts
        get posts() {
          return state.sourceData.posts.filter((p) => p.userId === user.id);
        },
        // authUser.postsCount
        get postsCount() {
          return this.posts.length;
        },
        get threads() {
          return state.sourceData.threads.filter((t) => t.userId === user.id);
        },
        get threadsCount() {
          return this.threads.length;
        },
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.sourceData.threads, id);
        return {
          ...thread,
          // use js `get` can only computed when we access the property
          get author() {
            return findById(state.sourceData.users, thread.userId);
          },
          get repliesCount() {
            return thread.posts.length - 1; // subtract first post since it's not a reply for the thread
          },
          get contributorsCount() {
            return thread.contributors ? thread.contributors.length : 0;
          },
        };
      };
    },
  },
  mutations: {
    setPost(state, { post }) {
      upsert(state.sourceData.posts, post);
    },
    setThread(state, { thread }) {
      upsert(state.sourceData.threads, thread);
    },
    setUser(state, { user, userId }) {
      const userIndex = state.sourceData.users.findIndex(
        (user) => user.id === userId
      );
      state.sourceData.users[userIndex] = user;
    },
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),
    appendContributorToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "contributors",
    }),
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "threads",
    }),
  },
  actions: {
    createPost(context, post) {
      post.id = "abcd" + Math.floor(Date.now() / 1000);
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      context.commit("setPost", { post }); // set the post
      context.commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      }); // append post to thread
      context.commit("appendContributorToThread", {
        childId: context.state.authId,
        parentId: post.threadId,
      });
    },
    async createThread({ commit, state, dispatch }, { forumId, title, text }) {
      const id = "abcd" + Math.floor(Date.now() / 1000);
      const userId = state.authId;
      const thread = {
        forumId,
        title,
        publishedAt: Math.floor(Date.now() / 1000),
        userId,
        id,
      };
      commit("setThread", { thread });
      commit("appendThreadToUser", { parentId: userId, childId: id });
      commit("appendThreadToForum", { parentId: forumId, childId: id });
      // create a new post in this new thread
      dispatch("createPost", { text, threadId: id });

      return findById(state.sourceData.threads, id);
    },
    async updateThread({ commit, state }, { text, title, id }) {
      const thread = findById(state.sourceData.threads, id);
      const post = findById(state.sourceData.posts, thread.posts[0]);
      const newThread = { ...thread, title };
      const newPost = { ...post, text };
      commit("setThread", { thread: newThread });
      commit("setPost", { post: newPost });
      return newThread;
    },
    // can use object destruction to not write "context"
    updateUser({ commit }, user) {
      commit("setUser", { user, userId: user.id });
    },
  },
});

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state.sourceData[parent], parentId);
    // prevent if a child is the first child that the there's not child array in the parent
    resource[child] = resource[child] || [];

    // prevent duplicate add same id to resource child
    // like contributor, because users can reply many times but contributorCount should only count once
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}

export default store;
