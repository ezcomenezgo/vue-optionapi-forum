<template>
  <div>Hello Thread</div>
  <div class="flex flex-col w-full border-opacity-50">
    <h2>{{ thread.title }}</h2>
    <p>
      By {{ thread.author.name }}, <AppDate :timestamp="thread.publishAt" />
      <span>
        {{ thread.repliesCount }} replies by
        {{ thread.contributorsCount }}
        contributors</span
      >
    </p>
    <router-link :to="{ name: 'ThreadEdit', params: { id } }"
      >Edit thread</router-link
    >
    <post-list :posts="threadPosts" />
    <div class="divider"></div>
    <post-editor @save-post="addPost" />
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate.vue";

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
    AppDate,
  },
  computed: {
    threads() {
      return this.$store.state.sourceData.threads;
    },
    posts() {
      return this.$store.state.sourceData.posts;
    },
    thread() {
      return this.$store.getters.thread(this.id);
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
      this.$store.dispatch("createPost", post);
    },
  },
};
</script>
