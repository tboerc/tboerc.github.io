<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";

const style = cva("p-4 md:p-6", {
  variants: {
    border: {
      y: "border-y border-y-black",
      t: "border-t border-t-black",
      b: "border-b border-b-black",
    },
  },
});

type StyleProps = VariantProps<typeof style>;

type ContainerProps = { is?: string; border?: StyleProps["border"] };

const { is, border } = withDefaults(defineProps<ContainerProps>(), {
  is: "div",
});
</script>

<template>
  <component :is="is" :class="style({ border })">
    <slot />
  </component>
</template>
