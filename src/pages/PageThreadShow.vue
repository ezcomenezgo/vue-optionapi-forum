<template>
  <div>Hello Thread</div>
  <div class="flex flex-col w-full border-opacity-50">
    <h2>{{ thread.title }}</h2>
    <post-list :posts="threadPosts" />
    <div class="divider"></div>
    <form @submit.prevent="addPost">
      <textarea v-model="newPostText" name="" id=""></textarea>
      <button>submit</button>
    </form>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import PostList from "@/components/PostList.vue";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    PostList,
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      newPostText: "",
    };
  },
  computed: {
    thread() {
      return this.threads.find((t) => t.id === this.id); // also available as this.$route.params.id
    },
    threadPosts() {
      return this.posts.filter((p) => p.threadId === this.id);
    },
  },
  methods: {
    addPost() {
      const postId = "abcd" + Math.floor(Date.now() / 1000);
      const post = {
        id: postId,
        text: this.newPostText,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: "L664y3qZSubDbT1R6npC0EEybJ73",
      };
      // sourceData.posts.push(post);
      this.posts.push(post);
      this.thread.posts.push(post.id);
      this.newPostText = "";
    },
  },
};
</script>
