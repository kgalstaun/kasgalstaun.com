<template>
  <main v-if="loaded && !error">
    <LandingPageComponent />
    <PanelPageComponent />
    <MotivationPageComponent />
  </main>
  <div v-if="!loaded" class="loading-animation-wrapper">
    <LoadingAnimationComponent />
  </div>
  <ErrorComponent class="p-xl" v-if="error" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import LandingPageComponent from "@/components/landing-page/LandingPageComponent";
import PanelPageComponent from "@/components/panel-page/PanelPageComponent";
import MotivationPageComponent from "@/components/motivation-page/MotivationPageComponent";
import LoadingAnimationComponent from "@/components/generic/LoadingAnimationComponent";
import ErrorComponent from "@/components/generic/ErrorComponent";
import QueryService from "@/service/QueryService";
import HeaderQuery from "@/queries/HeaderQuery";
import Header from "@/data/Header";
import RouteEnums from "@/enums/RouteEnums";

const route = useRoute();
let loaded = ref(false);
let error = ref(false);

onMounted(() => {
  fetchPersonalOrDefaultHeader();
});

function fetchPersonalOrDefaultHeader() {
  if (RouteEnums.PERSONAL === route.name && route.params.id) {
    fetchHeader(route.params.id);
  } else {
    fetchHeader(process.env.VUE_APP_DEFAULT_ID);
  }
}

async function fetchHeader(id) {
  QueryService.fetch(HeaderQuery, { id: id })
    .then((data) => {
      if (data.header === null && RouteEnums.PERSONAL === route.name) {
        fetchHeader(process.env.VUE_APP_DEFAULT_ID);
        return;
      }
      let header = data.header;
      Header.set(header.text);
      loaded.value = true;
      return true;
    })
    .catch(() => {
      error.value = true;
    });
}
</script>

<style lang="scss" scoped>
main {
  max-width: 1400px;
  width: 100%;
}

.loading-animation-wraopper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
