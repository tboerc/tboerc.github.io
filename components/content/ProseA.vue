<template>
  <StyledNuxtLink :href="href" :target="target">
    <slot />
  </StyledNuxtLink>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
});
</script>
