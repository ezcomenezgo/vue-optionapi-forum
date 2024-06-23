<template>
  <div>Hello Home</div>
  <ForumList :forums="forums" />
</template>

<script>
import sourceData from "@/data.json";
import ForumList from "@/components/ForumList.vue";

export default {
  components: {
    ForumList,
  },
  data() {
    return {
      forums: sourceData.forums,
    };
  },
};
</script>
