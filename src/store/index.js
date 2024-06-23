import { createStore } from "vuex";
import sourceData from "@/data.json";

const store = createStore({
  state() {
    return {
      sourceData,
    };
  },
  mutations: {
    setPost(state, { post }) {
      state.sourceData.posts.push(post);
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
  },
});

export default store;
