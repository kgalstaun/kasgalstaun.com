import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "@/components/MainComponent.vue";

const routes = [
  {
    path: "/",
    name: "werk",
    component: MainComponent,
  },
  {
    path: "/werk/:id",
    name: "werkItem",
    component: MainComponent,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
