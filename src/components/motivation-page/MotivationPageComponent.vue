<template>
  <div ref="motivation" class="h-screen p-lg flex justify-center items-end">
    <pre>{{ Motivation }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
      loaded.value = true;
    })
    .catch(() => (error.value = true));
}
</script>
