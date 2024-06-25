<template>
  <div>
    <p>Editing {{ thread.title }}</p>
    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import ThreadEditor from "@/components/ThreadEditor.vue";

export default {
  components: {
    ThreadEditor,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async save({ title, text }) {
      const thread = await this.$store.dispatch("updateThread", {
        id: this.id,
        title,
        text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "ThreadShow", params: { id: this.id } });
    },
  },
  computed: {
    thread() {
      return this.$store.state.sourceData.threads.find((t) => t.id === this.id);
    },
    text() {
      return this.$store.state.sourceData.posts.find(
        (post) => post.id === this.thread.posts[0]
      ).text;
    },
  },
};
</script>
