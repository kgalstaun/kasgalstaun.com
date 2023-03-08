<template>
  <div v-if="content">
    <div v-if="panels" class="w-full flex justify-center items-center pt-">
      <div v-for="(panel, index) in panels" :key="index" class="px-sm">
        <PanelComponent :panel="panel"></PanelComponent>
      </div>
    </div>
  </div>
</template>

<script setup>
import PanelComponent from "@/components/PanelComponent";
import { defineProps, computed } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  content: Object,
});

let panels = computed(() =>
  props.content.panels ? props.content.panels : null
);
</script>
