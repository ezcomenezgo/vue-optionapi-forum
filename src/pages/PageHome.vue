<template>
  <div>Hello Home</div>
  <CategoryList :categories="categories" />
</template>

<script>
import sourceData from "@/data.json";
import CategoryList from "@/components/CategoryList.vue";

export default {
  components: {
    CategoryList,
  },
  data() {
    return {
      categories: sourceData.categories,
    };
  },
};
</script>
