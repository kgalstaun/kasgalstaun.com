import { createRouter, createWebHistory } from "vue-router";
import MotivationPageComponent from "@/components/motivation-page/MotivationPageComponent";

const routes = [
  {
    path: "/",
    name: "werk",
    component: MotivationPageComponent,
  },
  {
    path: "/werk/:id",
    name: "werkItem",
    component: MotivationPageComponent,
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
