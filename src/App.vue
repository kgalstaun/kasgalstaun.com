<template>
  <main v-if="loaded && !error">
    <LandingPageComponent />
    <PanelPageComponent />
    <MotivationPageComponent />
  </main>
  <ErrorComponent v-if="error" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import LandingPageComponent from "./components/landing-page/LandingPageComponent";
import PanelPageComponent from "@/components/panel-page/PanelPageComponent";
import MotivationPageComponent from "./components/motivation-page/MotivationPageComponent";
import ErrorComponent from "@/components/generic/ErrorComponent";
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
