<template>
  <div>
    <p>Create a new thread in {{ forum.name }}</p>
    <ThreadEditor @save="save" @cancel="cancel" />
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
    forumId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async save({ title, text }) {
      console.log("save");
      const thread = await this.$store.dispatch("createThread", {
        forumId: this.forum.id,
        title,
        text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "ForumShow", params: { id: this.forumId } });
    },
  },
  computed: {
    forum() {
      return findById(this.$store.state.sourceData.forums, this.forumId);
    },
  },
};
</script>
