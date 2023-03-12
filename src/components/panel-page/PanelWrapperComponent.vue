@@ -1,22 +0,0 @@
<template>
  <div v-if="panels" class="w-full sm:flex justify-center items-center pt-">
    <div
      v-for="(panel, index) in panels"
      :key="index"
      class="max-sm:p-md sm:px-sm"
    >
      <PanelComponent :panel="panel"></PanelComponent>
    </div>
  </div>
</template>

<script setup>
import PanelComponent from "@/components/panel-page/PanelComponent";
import { defineProps, computed } from "vue";

const props = defineProps({
  content: Object,
});

let panels = computed(() =>
  props.content.panels ? props.content.panels : null
);
</script>
