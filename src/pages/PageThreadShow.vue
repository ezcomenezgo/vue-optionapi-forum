<template>
  <div>Hello Thread</div>
  <div class="flex flex-col w-full border-opacity-50">
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
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      threads: sourceData.threads,
      users: sourceData.users,
      posts: sourceData.posts,
    };
  },
  computed: {
    thread() {
      return this.threads.find((t) => t.id === this.id); // also available as this.$route.params.id
    },
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
