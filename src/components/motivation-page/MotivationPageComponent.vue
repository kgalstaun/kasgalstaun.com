<template>
  <div ref="motivation" class="min-h-screen p-md lg:p-lg">
    <Transition>
      <div
        v-if="inViewport && loaded && Motivation"
        class="flex flex-col xl:flex-row justify-center items-center xl:items-start"
      >
        <h2 class="motivation-title text-center max-xl:p-lg xl:pr-xl">
          {{ Motivation.title }}
        </h2>
        <MotivationLetterComponent ref="motivation-letter" />
        <MotivationSidebarComponent class="xl:ml-xl max-xl:mt-xl" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import MotivationSidebarComponent from "./MotivationSidebarComponent";
import MotivationLetterComponent from "./MotivationLetterComponent";
import IntersectionHelper from "@/helpers/IntersectionHelper";
import QueryService from "@/service/QueryService";
import MotivationQuery from "@/queries/MotivationQuery";
import Motivation from "@/data/Motivation";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";
import RouteEnums from "@/enums/RouteEnums";

const route = useRoute();
let motivation = ref(null);
let inViewport = ref(false);
let loaded = ref(false);
let error = ref(false);

onMounted(() => {
  fetchPersonalOrDefaultMotivation();
  IntersectionHelper.createObserver(motivation.value, inViewport).observe(
    motivation.value
  );
});

watch(
  ScrollEvent.listen,
  () => {
    let elementRef = ScrollEvent.listen.value;
    if (!elementRef) return;
    scrollToElement(elementRef);
  },
  { deep: true }
);

function fetchPersonalOrDefaultMotivation() {
  if (RouteEnums.PERSONAL === route.name && route.params.id) {
    fetchMotivation(route.params.id);
  } else {
    fetchMotivation(process.env.VUE_APP_DEFAULT_ID);
  }
}

function scrollToElement(elementRef) {
  if (elementRef.section === ElementEnums.MOTIVATION) {
    ScrollHelper.scrollToElement(motivation.value);
  }
}

async function fetchMotivation(id) {
  QueryService.fetch(MotivationQuery, { id: id })
    .then((data) => {
      if (!data.motivations?.length && RouteEnums.PERSONAL === route.name) {
        fetchMotivation(process.env.VUE_APP_DEFAULT_ID);
        return;
      }
      let motivationData = data.motivations[0];
      Motivation.value = motivationData;
      loaded.value = true;
    })
    .catch(() => (error.value = true));
}
</script>

<style lang="scss" scoped>
h2.motivation-title {
  @media screen and (max-width: $screen-size-xl) {
    margin-top: -7.1rem;
  }
}
</style>
