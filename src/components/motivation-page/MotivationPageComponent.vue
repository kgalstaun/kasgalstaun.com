<template>
  <div ref="motivation" class="h-screen p-lg">
    <Transition>
      <div
        v-if="inViewport && loaded && Motivation"
        class="flex flex-row justify-center items-start"
      >
        <MotivationLetterComponent ref="motivation-letter" />
        <MotivationSidebarComponent class="py-md mx-xl" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import MotivationSidebarComponent from "./MotivationSidebarComponent";
import MotivationLetterComponent from "./MotivationLetterComponent";
import IntersectionHelper from "@/helpers/IntersectionHelper";
import QueryService from "@/service/QueryService";
import MotivationQuery from "@/queries/MotivationQuery";
import Motivation from "@/data/Motivation";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";

const motivation = ref(null);
const inViewport = ref(false);
let loaded = ref(false);
let error = ref(false);

onMounted(() => {
  fetchMotivationData();
  IntersectionHelper.createObserver(motivation.value, inViewport).observe(
    motivation.value
  );
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
