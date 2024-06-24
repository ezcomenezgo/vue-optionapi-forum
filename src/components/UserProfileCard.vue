<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure>
      <img :src="user.avatar" alt="Movie" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ user.username }}</h2>
      <p>{{ user.name }}</p>
      <p>Bio: {{ user.bio || "None" }}</p>
      <p>{{ user.postsCount }} posts</p>
      <p>{{ user.threadsCount }} threads</p>
    </div>
    <button>
      <router-link :to="{ name: 'ProfileEdit' }">Edit Profile</router-link>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
