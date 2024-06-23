<template>
  <div>Hello Home</div>
  <CategoryList :categories="categories" />
</template>

<script>
import CategoryList from "@/components/CategoryList.vue";

export default {
  components: {
    CategoryList,
  },
  computed: {
    categories() {
      return this.$store.state.sourceData.categories;
    },
  },
};
</script>
