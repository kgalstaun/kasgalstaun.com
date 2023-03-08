<template>
  <template v-if="loaded && !error">
    <main>
      <LandingPageComponent />
      <PanelPageComponent />
      <MotivationComponent />
    </main>
    <FooterComponent />
    <ErrorComponent v-if="error" />
  </template>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LandingPageComponent from "./components/LandingPageComponent";
import PanelPageComponent from "@/components/PanelPageComponent";
import MotivationComponent from "@/components/MotivationComponent";
import FooterComponent from "@/components/FooterComponent.vue";
import ErrorComponent from "@/components/ErrorComponent";
import QueryService from "@/service/QueryService";
import MetaQuery from "@/queries/MetaQuery";
import Meta from "@/data/Meta";

onMounted(() => {
  fetchMetaData();
});

let loaded = ref(false);
let error = ref(false);

async function fetchMetaData() {
  QueryService.fetch(MetaQuery)
    .then((data) => {
      let metaData = data.metas[0];
      Meta.set(metaData.headerText, metaData.footerText);
      loaded.value = true;
    })
    .catch(() => (error.value = true));
}
</script>
