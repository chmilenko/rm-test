// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  app: {
    baseURL: "/rm-test/",
    buildAssetsDir: "assets",
  },
});
