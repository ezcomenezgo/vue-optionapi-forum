<template>
  <div>
    <h2 class="text-5xl">{{ category.name }}</h2>
    <p class="text-xl">{{ category.slug }}</p>
    <ForumList :forums="forums" />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";
import { findById } from "@/helpers/index";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    ForumList,
  },
  computed: {
    category() {
      return findById(this.$store.state.sourceData.categories, this.id);
    },
    forums() {
      return findById(this.$store.state.sourceData.forums, this.id);
    },
  },
};
</script>
