<template>
  <div>Hello Thread</div>
  <div class="flex flex-col w-full border-opacity-50">
    <h2>{{ thread.title }}</h2>
    <post-list :posts="threadPosts" />
    <div class="divider"></div>
    <post-editor @save-post="addPost" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    PostList,
    PostEditor,
  },
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
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
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.posts.push(post);
      this.thread.posts.push(post.id);
    },
  },
};
</script>
