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
    appendPostToThread(state, { postId, threadId }) {
      const thread = findById(state.sourceData.threads, threadId);
      // prevent if a post is the first post that the there's not post array in the thread
      thread.posts = thread.posts || [];
      thread.posts.push(postId);
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = findById(state.sourceData.forums, forumId);
      // prevent if a thread is the first thread that the there's not thread array in the forum
      forum.threads = forum.threads || [];
      forum.threads.push(threadId);
    },
    appendThreadToUser(state, { userId, threadId }) {
      const user = findById(state.sourceData.users, userId);
      // prevent if a thread is the first thread that the there's not thread array in the user
      user.threads = user.threads || [];
      user.threads.push(threadId);
    },
  },
  actions: {
    createPost(context, post) {
      post.id = "abcd" + Math.floor(Date.now() / 1000);
      post.userId = context.state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000);
      context.commit("setPost", { post }); // set the post
      context.commit("appendPostToThread", {
        postId: post.id,
        threadId: post.threadId,
      }); // append post to thread
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
      commit("appendThreadToUser", { userId, threadId: id });
      commit("appendThreadToForum", { forumId, threadId: id });
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

export default store;
