<template>
  <div>
    <form @submit.prevent="save">
      <textarea v-model="text" name="" id=""></textarea>
      <button>submit</button>
    </form>
  </div>
</template>

<script>
import sourceData from "@/data.json";

export default {
  data() {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      text: "",
    };
  },
  methods: {
    save() {
      const postId = "abcd" + Math.floor(Date.now() / 1000);
      const post = {
        id: postId,
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.id,
        userId: "L664y3qZSubDbT1R6npC0EEybJ73",
      };
      this.$emit("save-post", { post });
      this.text = "";
    },
  },
};
</script>
