<template>
  <div>
    <h2 class="text-5xl">{{ category.name }}</h2>
    <p class="text-xl">{{ category.slug }}</p>
    <ForumList :forums="forums" />
  </div>
</template>

<script>
import ForumList from "@/components/ForumList.vue";

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
      return this.$store.state.sourceData.categories.find(
        (c) => c.id === this.id
      );
    },
    forums() {
      return this.$store.state.sourceData.forums.filter(
        (f) => f.categoryId === this.id
      );
    },
  },
};
</script>
