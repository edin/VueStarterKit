import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Default from "@/layouts/Default.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Trash from "@/views/Trash.vue";
import Spam from "@/views/Spam.vue";

import {AuthModule} from "@/views/Auth/AuthModule";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        component: Default,
        children: [
            {
                path: "/",
                name: "Home",
                component: Home,
            },
            {
                path: "/about",
                name: "About",
                component: About,
            },
            {
                path: "/trash",
                name: "Trash",
                component: Trash,
            },
            {
                path: "/spam",
                name: "Spam",
                component: Spam,
            },
        ],
    },
    {
        path: "/",
        component: AuthLayout,
        children: AuthModule.getRoutes()
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
