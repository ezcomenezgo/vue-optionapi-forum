<template>
  <div>
    <form @submit.prevent="save">
      <label for="title">Title: </label>
      <input v-model="form.title" type="text" name="title" id="" />
      <textarea v-model="form.text" name="" id=""></textarea>
      <button>Submit</button>
      <button @click.prevent="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      form: {
        title: this.title,
        text: this.text,
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", { ...this.form });
    },
  },
};
</script>
