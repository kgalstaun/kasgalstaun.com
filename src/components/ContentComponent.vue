<template>
  <div v-if="content" class="w-full flex-row">
    <div
      class="content-introduction text-center mx-xl px-xl"
      v-html="content.introduction.html"
    ></div>
    <div v-if="panels" class="w-full h-full flex justify-center">
      <div v-for="(panel, index) in panels" :key="index" class="px-sm">
        <PanelComponent :panel="panel"></PanelComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import PanelComponent from "@/components/PanelComponent.vue";
import { defineProps, computed } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  content: Object,
});

let panels = computed(() =>
  props.content.panels ? props.content.panels : null
);
</script>

<style scoped>
.content-introduction {
  height: 17vh;
}
</style>
