<template>
  <div>Category List</div>
  <div
    v-for="category in categories"
    :key="category.id"
    class="card w-full border-opacity-50"
  >
    <div class="card-body flex w-full bg-base-300 rounded-box">
      <router-link
        class="card-title"
        :to="{ name: 'CategoryShow', params: { id: category.id } }"
      >
        {{ category.name }}
      </router-link>
      <p>{{ category.slug }}</p>

      <div>
        {{ category.forums ? category.forums.length : "No" }}
        {{ category.forums?.length > 1 ? "forums" : "forum" }}
      </div>
      <div class="divider"></div>
      <ForumList :forums="findForumsInCategory(category.id)" />
    </div>

    <div class="divider divider-accent"></div>
  </div>
</template>

<script>
import sourceData from "@/data.json";
import ForumList from "@/components/ForumList.vue";

export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  components: {
    ForumList,
  },
  methods: {
    findForumsInCategory(categoryId) {
      let data = sourceData.forums.filter((f) => f.categoryId === categoryId);
      return data;
    },
  },
};
</script>
