<template>
  <div>
    <form @submit.prevent="save">
      <textarea v-model="text" name="" id=""></textarea>
      <button>submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: "L664y3qZSubDbT1R6npC0EEybJ73",
      };
      this.$emit("save-post", { post });
      this.text = "";
    },
  },
  computed: {
    threads() {
      return this.$store.state.sourceData.threads;
    },
    posts() {
      return this.$store.state.sourceData.posts;
    },
  },
};
</script>
