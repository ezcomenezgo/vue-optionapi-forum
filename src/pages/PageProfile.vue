<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure>
      <img :src="user.avatar" alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ user.username }}</h2>
      <p>{{ user.name }}</p>
      <p>Bio: {{ user.bio || "None" }}</p>
      <p>{{ userPostsCount }} posts</p>
      <p>{{ userThreadsCount }} threads</p>
    </div>
  </div>

  <PostList :posts="userPosts" />
</template>

<script>
import PostList from "@/components/PostList.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PostList,
  },
  computed: {
    ...mapGetters({
      user: "authUser",
    }),
    userPosts() {
      return this.$store.state.sourceData.posts.filter(
        (p) => p.userId === this.user.id
      );
    },
    userPostsCount() {
      return this.userPosts.length;
    },
    userThreads() {
      return this.$store.state.sourceData.threads.filter(
        (t) => t.userId === this.user.id
      );
    },
    userThreadsCount() {
      return this.userThreads.length;
    },
  },
};
</script>
