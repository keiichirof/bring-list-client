import VueRouter, { Route } from "vue-router";
import Vue, { ComponentOptions } from "vue";
import { Dictionary } from "vue-router/types/router";

declare module "vuedraggable";

declare module "vue/types/vue" {
  interface Vue {
    $auth: any;
    $router: VueRouter;
  }
}

declare module "vue" {
  // https://nuxtjs.org/api/context
  export interface NuxtContext<V extends Vue> {
    app: V;
    isClient: boolean;
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    isHMR: boolean;
    route: Route;
    env: object;
    params: object;
    query: Dictionary<string | (string | null)[]>;
    // ...add remaining interface here
  }

  // https://nuxtjs.org/api/pages-fetch
  export interface ComponentOptions<V extends Vue> {
    asyncData?(context: NuxtContext<V>): Promise<object> | object;
    fetch?(context: NuxtContext<V>): Promise<object> | object;
    // ...add remaining interface here
  }
}
