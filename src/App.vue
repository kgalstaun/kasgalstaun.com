<template>
  <main v-if="loaded && !error">
    <LandingPageComponent />
    <PanelPageComponent />
    <MotivationPageComponent />
  </main>
  <ErrorComponent class="p-xl" v-if="error" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import LandingPageComponent from "./components/landing-page/LandingPageComponent";
import PanelPageComponent from "@/components/panel-page/PanelPageComponent";
import MotivationPageComponent from "./components/motivation-page/MotivationPageComponent";
import ErrorComponent from "@/components/generic/ErrorComponent";
import QueryService from "@/service/QueryService";
import HeaderQuery from "@/queries/HeaderQuery";
import Header from "@/data/Header";

onMounted(() => {
  fetchHeader();
});

let loaded = ref(false);
let error = ref(false);

async function fetchHeader() {
  QueryService.fetch(HeaderQuery, { id: process.env.VUE_APP_DEFAULT_ID })
    .then((data) => {
      let header = data.header;
      Header.set(header.text);
      loaded.value = true;
    })
    .catch(() => (error.value = true));
}
</script>
