import { createWebHistory, createRouter } from "vue-router";

import PageHome from "@/pages/PageHome.vue";
import PageProfile from "@/pages/PageProfile.vue";
import PageCategoryShow from "@/pages/PageCategoryShow.vue";
import PageForumShow from "@/pages/PageForumShow.vue";
import PageThreadShow from "@/pages/PageThreadShow.vue";
import PageThreadCreate from "@/pages/PageThreadCreate.vue";
import PageThreadEdit from "@/pages/PageThreadEdit.vue";
import PageNotFound from "@/pages/PageNotFound.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
  },
  {
    path: "/me",
    name: "Profile",
    component: PageProfile,
  },
  {
    path: "/me/edit",
    name: "ProfileEdit",
    component: PageProfile,
    props: { edit: true },
  },
  {
    path: "/category/:id",
    name: "CategoryShow",
    component: PageCategoryShow,
    props: true,
  },
  {
    path: "/forum/:id",
    name: "ForumShow",
    component: PageForumShow,
    props: true,
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: PageThreadShow,
    props: true,
    beforeEnter: (to, from, next) => {
      // ...
      const threadExist = store.state.sourceData.threads.find(
        (t) => t.id === to.params.id
      );
      if (threadExist) return next();
      else
        next({
          name: "NotFound",
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split("/") },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash,
        });
    },
  },
  {
    path: "/forum/:forumId/thread/create",
    name: "ThreadCreate",
    component: PageThreadCreate,
    props: true,
  },
  {
    path: "/thread/:id/edit",
    name: "ThreadEdit",
    component: PageThreadEdit,
    props: true,
  },
  // this is a soft 404, because it just deal with wrong url on client side
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
