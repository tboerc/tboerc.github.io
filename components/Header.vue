<script setup lang="ts">
import { cva } from "class-variance-authority";

const menuItemStyle = cva("font-display text-xl font-semibold uppercase sm:text-2xl lg:text-3xl", {
  variants: {
    active: { true: "text-violet-700" },
  },
});

const menu = [
  { text: "Home", name: "index" },
  { text: "About", name: "about" },
  { text: "Contact", name: "contact" },
  { text: "Blog", name: "blog" },
];

const route = useRoute();

const isRouteActive = (name: string, currentName: string) => {
  return currentName.includes(name);
};
</script>

<template>
  <Container border="b" class="flex flex-col font-display text-5xl uppercase md:text-6xl lg:text-7xl xl:text-8xl">
    <span>Tiago Boer Casagrande</span>
    <span class="self-end bg-violet-700 text-right text-white">Software engineer</span>
  </Container>

  <Container is="header" border="b" class="sticky top-0 flex overflow-auto bg-white">
    <nav>
      <ul class="flex gap-3 md:gap-6">
        <li v-for="item in menu" :class="menuItemStyle({ active: isRouteActive(item.name, route.name as string) })">
          <NuxtLink :to="{ name: item.name }">
            {{ item.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Container>
</template>
