<template>
  <div>Thread List</div>
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
      <div>{{ thread.repliesCount }} replies</div>
      <div class="w-10 rounded-full">
        <img :src="userById(thread.userId).avatar" alt="user" />
      </div>
    </div>

    <div class="divider divider-accent"></div>
  </div>
</template>

<script>
import { findById } from "@/helpers/index";

export default {
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  methods: {
    postById(postId) {
      return findById(this.posts, postId);
    },
    userById(userId) {
      return findById(this.users, userId);
    },
  },
  computed: {
    users() {
      return this.$store.state.sourceData.users;
    },
    posts() {
      return this.$store.state.sourceData.posts;
    },
  },
};
</script>
