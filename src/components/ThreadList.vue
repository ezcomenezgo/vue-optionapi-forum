<template>
  <div>Thread List</div>
  <!-- <div v-for="thread in threads" :key="thread.id">
    <div>
      {{ thread.title }} By {{ userById(thread.userId).name }}, post at
      {{ thread.publishedAt }}
      <div class="divider divider-accent"></div>
    </div>
  </div> -->
  <div
    v-for="thread in threads"
    :key="thread.id"
    class="card w-full border-opacity-50"
  >
    <div class="card-body flex w-full bg-base-300 rounded-box">
      <router-link
        class="card-title"
        :to="{ name: 'ThreadShow', params: { id: thread.id } }"
      >
        {{ thread.title }}
      </router-link>
      <p>
        By {{ userById(thread.userId).name }}, post at
        <AppDate :timestamp="thread.publishedAt" />
      </p>
      <div>{{ thread.posts.length }} replies</div>
      <div class="w-10 rounded-full">
        <img :src="userById(thread.userId).avatar" alt="user" />
      </div>
    </div>

    <div class="divider divider-accent"></div>
    <!-- <div
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
    </div> -->
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // threads: sourceData.threads,
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
