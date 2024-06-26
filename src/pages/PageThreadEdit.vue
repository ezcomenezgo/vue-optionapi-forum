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
import { findById } from "@/helpers/index";

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
      return findById(this.$store.state.sourceData.threads, this.id);
    },
    text() {
      return findById(this.$store.state.sourceData.posts, this.thread.posts[0])
        .text;
    },
  },
};
</script>
