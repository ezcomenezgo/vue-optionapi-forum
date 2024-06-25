<template>
  <div>
    <p>Create a new thread in {{ forum.name }}</p>
    <form @submit.prevent="save">
      <label for="title">Title: </label>
      <input v-model="title" type="text" name="title" id="" />
      <textarea v-model="text" name="" id=""></textarea>
      <button>Submit</button>
      <button @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      text: "",
    };
  },
  methods: {
    async save() {
      console.log("save");
      const thread = await this.$store.dispatch("createThread", {
        forumId: this.forum.id,
        title: this.title,
        text: this.text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "ForumShow", params: { id: this.forumId } });
    },
  },
  computed: {
    forum() {
      return this.$store.state.sourceData.forums.find(
        (f) => f.id === this.forumId
      );
    },
  },
};
</script>
