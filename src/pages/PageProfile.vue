<template>
  <div v-if="!edit">
    <UserProfileCard :user="user" />
  </div>
  <div v-else>
    <UserProfileCardEditor :user="user" />
  </div>
  <PostList :posts="user.posts" />
</template>

<script>
import PostList from "@/components/PostList.vue";
import UserProfileCard from "@/components/UserProfileCard.vue";
import UserProfileCardEditor from "@/components/UserProfileCardEditor.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      user: "authUser",
    }),
  },
};
</script>
