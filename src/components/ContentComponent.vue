<template>
  <div class="w-full flex-row">
    <div
      class="text-center mx-xl px-xl"
      v-html="content.introduction.html"
    ></div>
    <div class="w-full flex flex-wrap justify-around">
      <div>YYY</div>
      <div>YYY</div>
      <div>YYY</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  content: Object,
});
</script>
