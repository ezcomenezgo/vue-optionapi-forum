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
      <p>thread count: {{ userById(post.userId).threadsCount }}</p>
      <p>
        <AppDate :timestamp="post.publishedAt" />
      </p>
    </div>
    <div class="divider divider-accent"></div>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    userById(userId) {
      return this.$store.getters.user(userId);
    },
  },
  computed: {
    users() {
      return this.$store.state.sourceData.users;
    },
  },
};
</script>
