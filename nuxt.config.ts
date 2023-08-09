// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content", "@nuxtjs/google-fonts"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Oswald: {
        wght: [600],
      },
      Poppins: {
        wght: [400, 700],
        ital: [400, 700],
      },
      "JetBrains Mono": {
        wght: [400],
      },
    },
  },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },
});
