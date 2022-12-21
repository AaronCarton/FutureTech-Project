import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./components/holders/AppHolder.vue"),
    children: [
      {
        path: "", // Eigenlijk zal de / altijd hiernaar resolven
        component: () => import("./screens/Home.vue"),
      },
    ],
  },

  {
    path: "/nfc",
    component: () => import("./components/holders/NFCHolder.vue"),
    children: [
      {
        path: "scan",
        component: () => import("./screens/NFC/scan.vue"),
      },
      {
        path: "write",
        component: () => import("./screens/NFC/write.vue"),
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {}
);

export default router;
