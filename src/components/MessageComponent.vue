<template>
  <p :class="type"><slot></slot></p>
</template>

<script setup>
import { defineProps } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  type: String,
});
</script>
