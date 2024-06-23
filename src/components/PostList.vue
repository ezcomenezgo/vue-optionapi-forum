<template>
  <div
    class="card bg-base-300 rounded-box"
    v-for="post in posts"
    :key="post.id"
  >
    <div class="w-10 rounded-full">
      <img :src="userById(post.userId).avatar" alt="user" />
    </div>
    <div class="card-body">
      <p>
        {{ userById(post.userId).name }}
      </p>
      <p>{{ post.text }}</p>
      <p>post count: {{ userById(post.userId).postsCount }}</p>
      <p>
        <AppDate :timestamp="post.publishedAt" />
      </p>
    </div>
    <div class="divider divider-accent"></div>
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      users: sourceData.users,
    };
  },
  methods: {
    userById(userId) {
      return this.users.find((u) => u.id === userId);
    },
  },
};
</script>
