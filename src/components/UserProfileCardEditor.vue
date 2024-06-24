<template>
  <form @submit.prevent="save" action="">
    <div class="card card-side bg-base-100 shadow-xl">
      <figure>
        <img :src="activeUser.avatar" alt="Movie" />
      </figure>
      <div class="card-body">
        <label for="username">Username</label>
        <input
          v-model="activeUser.username"
          type="text"
          name="username"
          id=""
        />
        <label for="name">Name</label>
        <input v-model="activeUser.name" type="text" name="name" id="" />
        <label for="bio">Bio</label>
        <textarea v-model="activeUser.bio" name="bio" id=""></textarea>

        <p>{{ user.postsCount }} posts</p>
        <p>{{ user.threadsCount }} threads</p>
      </div>
      <button type="submit">Submit</button>
      <button @click="cancel">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeUser: { ...this.user },
    };
  },
  methods: {
    save() {
      // clone it to prevent bound the activeUser object to set user object in the store
      this.$store.dispatch("updateUser", { ...this.activeUser });
      this.$router.push({ name: "Profile" });
    },
    cancel() {
      this.$router.push({ name: "Profile" });
      console.log("add notification");
    },
  },
};
</script>
