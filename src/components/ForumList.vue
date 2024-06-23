<template>
  <div>Forum List</div>
  <div
    v-for="forum in forums"
    :key="forum.id"
    class="card w-full border-opacity-50"
  >
    <div class="card-body flex w-full bg-base-300 rounded-box">
      <router-link
        class="card-title"
        :to="{ name: 'ForumShow', params: { id: forum.id } }"
      >
        {{ forum.name }}
      </router-link>
      <p>{{ forum.description }}</p>
      <div>
        {{ forum.threads ? forum.threads.length : "No" }}
        {{ forum.threads?.length > 1 ? "threads" : "thread" }}
      </div>
    </div>

    <div class="divider divider-accent"></div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      type: Array,
      required: true,
    },
  },
};
</script>
