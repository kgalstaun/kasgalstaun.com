import { createRouter, createWebHistory } from "vue-router";
import PanelPageComponent from "@/components/PanelPageComponent";

const routes = [
  {
    path: "/",
    name: "werk",
    component: PanelPageComponent,
  },
  {
    path: "/werk/:id",
    name: "werkItem",
    component: PanelPageComponent,
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
