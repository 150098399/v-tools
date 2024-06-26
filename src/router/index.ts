import { createMemoryHistory, createRouter } from "vue-router";

import Home from "../view/Home.vue";

const Watermark = () => import("../view/waterMark/index.vue");
const Format = () => import("../components/Format.vue");
const Merge = () => import("../components/Merge.vue");
const AudioExtraction = () => import("../components/AudioExtraction.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      { path: "/watermark", name: "watermark", component: Watermark },
      {
        path: "/format",
        name: "format",
        component: Format,
      },
      {
        path: "/audioExtraction",
        name: "audioExtraction",
        component: AudioExtraction,
      },
      {
        path: "/merge",
        name: "merge",
        component: Merge,
      },
    ],
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
