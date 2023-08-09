<script setup lang="ts">
import { type NuxtLinkProps } from "nuxt/app";

const props = defineProps<NuxtLinkProps>();
</script>

<template>
  <NuxtLink v-bind="props" class="text-violet-700 underline">
    <slot />
  </NuxtLink>
</template>
