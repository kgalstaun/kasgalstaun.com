import { createRouter, createWebHistory } from "vue-router";
import DefaultPageComponent from "@/components/DefaultPageComponent.vue";

const routes = [
  {
    path: "/",
    name: "werk",
    component: DefaultPageComponent,
  },
  {
    path: "/werk/:id",
    name: "werkItem",
    component: DefaultPageComponent,
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
