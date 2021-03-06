export default {
  mode: "universal",
  router: {
    base: "/"
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "bring-list",
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/localStorage.js", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth"],
  auth: {
    redirect: {
      login: "/signup", // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: "/signin", // ログアウト時のリダイレクトURL
      callback: false, // Oauth認証等で必要となる コールバックルート
      home: false // ログイン後のリダイレクトURL
    },
    strategies: {
      local: {
        endpoints: {
          login: false,
          user: false,
          logout: false
        }
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      dark: false
    }
  },
  /*
   ** env configuration
   */
  env: {
    API_URL: process.env.API_URL || "http://34.97.204.124:18080"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) {}
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
};
