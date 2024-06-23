<template>
  <div>
    <h2 class="text-5xl">{{ forum.name }}</h2>
    <p class="text-xl">{{ forum.description }}</p>
    <ThreadList :threads="threads" />
  </div>
</template>

<script>
import sourceData from "@/data.json";
import ThreadList from "@/components/ThreadList.vue";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    ThreadList,
  },
  data() {
    return {
      forum: sourceData.forums.find((f) => f.id === this.id),
      threads: sourceData.threads.filter((t) => t.forumId === this.id),
    };
  },
};
</script>
