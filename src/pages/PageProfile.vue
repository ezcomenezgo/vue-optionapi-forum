<template>
  <UserProfileCard :user="user" />
  <PostList :posts="user.posts" />
</template>

<script>
import PostList from "@/components/PostList.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PostList,
    UserProfileCard,
  },
  computed: {
    ...mapGetters({
      user: "authUser",
    }),
  },
};
</script>
