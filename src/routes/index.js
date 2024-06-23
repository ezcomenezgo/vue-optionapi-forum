import { createWebHistory, createRouter } from "vue-router";
import sourceData from "@/data.json";

import PageHome from "@/pages/PageHome.vue";
import PageCategoryShow from "@/pages/PageCategoryShow.vue";
import PageForumShow from "@/pages/PageForumShow.vue";
import PageThreadShow from "@/pages/PageThreadShow.vue";
import PageNotFound from "@/pages/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome,
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
      const threadExist = sourceData.threads.find((t) => t.id === to.params.id);
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
});

export default router;
