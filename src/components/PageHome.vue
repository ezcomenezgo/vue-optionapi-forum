<template>
  <div>Hello Home</div>
  <thread-list :threads="threads" />
</template>

<script>
import sourceData from "@/data.json";
import ThreadList from "@/components/ThreadList.vue";

export default {
  components: {
    ThreadList,
  },
  data() {
    return {
      threads: sourceData.threads,
    };
  },
};
</script>
