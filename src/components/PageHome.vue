<template>
  <div>Hello</div>
  <div
    v-for="thread in threads"
    :key="thread.id"
    class="flex flex-col w-full border-opacity-50"
  >
    <h2>{{ thread.title }}</h2>
    <div
      class="card bg-base-300 rounded-box"
      v-for="postId in thread.posts"
      :key="postId"
    >
      <div class="w-10 rounded-full">
        <img :src="userById(postById(postId).userId).avatar" alt="user" />
      </div>
      <div class="card-body">
        <p>
          {{ userById(postById(postId).userId).name }}
        </p>
        <p>{{ postById(postId).text }}</p>
        <p>post count: {{ userById(postById(postId).userId).postsCount }}</p>
        <p>publish at: {{ postById(postId).publishedAt }}</p>
      </div>
      <div class="divider divider-accent"></div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users,
    };
  },
  methods: {
    postById(postId) {
      return this.posts.find((p) => p.id === postId);
    },
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>
