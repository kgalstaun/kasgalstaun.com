import { createRouter, createWebHistory } from "vue-router";
import MotivationPageComponent from "@/components/motivation-page/MotivationPageComponent";

// NOT IN USE ATM, HERE FOR FUTURE REFERENCE

const routes = [
  {
    path: "/",
    name: "custom/:id",
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
