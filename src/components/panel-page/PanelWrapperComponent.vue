@@ -1,22 +0,0 @@
<template>
  <div v-if="panels" class="w-full lg:flex justify-center items-center pt-">
    <div
      v-for="(panel, index) in panels"
      :key="index"
      class="px-0 md-:px-md max-lg:pb-lg lg:px-sm"
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
