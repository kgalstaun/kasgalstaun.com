<template>
  <div
    ref="motivation"
    v-if="loaded && Motivation"
    class="h-screen p-lg flex flex-row justify-around items-start"
  >
    <MotivationLetterComponent />
    <MotivationSidebarComponent class="py-md px-xl mx-xl" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import MotivationSidebarComponent from "./MotivationSidebarComponent";
import MotivationLetterComponent from "./MotivationLetterComponent";
import QueryService from "@/service/QueryService";
import MotivationQuery from "@/queries/MotivationQuery";
import Motivation from "@/data/Motivation";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";

const motivation = ref(null);
let loaded = ref(false);
let error = ref(false);

onMounted(() => {
  fetchMotivationData();
});

watch(
  ScrollEvent.listen,
  () => {
    const elementRef = ScrollEvent.listen.value;
    if (!elementRef) return;
    scrollToElement(elementRef);
  },
  { deep: true }
);

function scrollToElement(elementRef) {
  if (elementRef.section === ElementEnums.MOTIVATION) {
    ScrollHelper.scrollToElement(motivation.value);
  }
}

async function fetchMotivationData() {
  QueryService.fetch(MotivationQuery)
    .then((data) => {
      let motivationData = data.motivations[0];
      Motivation.value = motivationData;
      console.log(Motivation.value);
      loaded.value = true;
    })
    .catch(() => (error.value = true));
}
</script>
