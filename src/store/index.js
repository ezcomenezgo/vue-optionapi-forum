import { createStore } from "vuex";
import sourceData from "@/data.json";

const store = createStore({
  state() {
    return {
      sourceData,
      authId: "jUjmgCurRRdzayqbRMO7aTG9X1G2",
    };
  },
  getters: {
    authUser: (state) => {
      const user = state.sourceData.users.find(
        (user) => user.id === state.authId
      );
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
      state.sourceData.posts.push(post);
    },
    setUser(state, { user, userId }) {
      const userIndex = state.sourceData.users.findIndex(
        (user) => user.id === userId
      );
      state.sourceData.users[userIndex] = user;
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.sourceData.threads.find(
        (thread) => thread.id === threadId
      );
      thread.posts.push(postId);
    },
  },
  actions: {
    createPost(context, post) {
      post.id = "abcd" + Math.floor(Date.now() / 1000);
      context.commit("setPost", { post }); // set the post
      context.commit("appendPostToThread", {
        postId: post.id,
        threadId: post.threadId,
      }); // append post to thread
    },
    updateUser(context, user) {
      context.commit("setUser", { user, userId: user.id });
    },
  },
});

export default store;
