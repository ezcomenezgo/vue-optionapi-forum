<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <!-- <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Home' }">Home</router-link> -->
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :alt="`${authUser.name} profile pic`" :src="authUser.avatar" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li>
            {{ authUser.name }}
          </li>
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["authUser"]),
  },
};
</script>
