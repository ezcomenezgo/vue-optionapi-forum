<template>
  <div>
    <h2 class="text-5xl">{{ forum.name }}</h2>
    <p class="text-xl">{{ forum.description }}</p>
    <button>
      <router-link :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        >Create New Thread</router-link
      >
    </button>
    <ThreadList :threads="threads" />
  </div>
</template>

<script>
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
  computed: {
    forum() {
      return this.$store.state.sourceData.forums.find((f) => f.id === this.id);
    },
    threads() {
      return this.$store.state.sourceData.threads.filter(
        (t) => t.forumId === this.id
      );
    },
  },
};
</script>
