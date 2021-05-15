import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";

import store from "./store/index.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/coaches" },
        {
            name: "coaches-list",
            path: "/coaches",
            component: CoachesList
            // components: {
            //     header: TheHeader,
            //     default: CoachesList
            // }
        },
        {
            name: "coaches-details",
            path: "/coaches/:id",
            component: CoachDetails,
            props: true,
            children: [{ path: "contact", component: ContactCoach }] // /coaches/c1/contact
        },
        { path: "/register", component: CoachRegistration, meta: { needsAuth: true } },
        { path: "/requests", component: RequestsReceived, meta: { needsAuth: true} },
        { path: "/auth", component: UserAuth, meta: { needsNoAuth: true}},
        { path: "/:notFound(.*)", component: NotFound }
    ]
});

router.beforeEach((to, _, next) => {
    const isAuthenticated = store.getters["auth/isAuthenticated"];
    if (to.meta.needsAuth && !isAuthenticated) {
        next("/auth");
    } else if (to.meta.needsNoAuth && isAuthenticated) {
        next("/");
    } else {
        next();
    }
});

export default router;
