<template>
  <transition name="fade" mode="out-in">
    <main ref="main">
      <div
        v-if="Content.get && Content.get.html"
        name="contentWrapper"
        :key="Content.get"
        v-html="Content.html"
      ></div>
    </main>
  </transition>
  <ErrorComponent v-if="error"></ErrorComponent>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Content from "@/state/Content";
import QueryService from "@/service/QueryService";
import DataQuery from "@/queries/DataQuery";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";
import ErrorComponent from "@/components/ErrorComponent";

const route = useRoute();
const router = useRouter();
let error = ref(false);
const main = ref(null);

watch(route, () => {
  Content.reset();
  fetchData();
});

watch(ScrollEvent.listen, () => {
  const element = ScrollEvent.listen.value;
  if (element && element === ElementEnums.MAIN) {
    ScrollHelper.scrollToElement(main);
  }
});

onMounted(() => {
  fetchData();
});

async function fetchData() {
  const routeParam = route.params.id ? route.params.id : null;
  let queryTitle = routeParam ? routeParam : route.name;

  QueryService.fetch(DataQuery, { title: queryTitle })
    .then((response) => {
      if (response.dataItems.length > 0) {
        Content.set(response.dataItems[0]);
        if (error.value) {
          error.value = false;
        }
      } else error.value = true;
    })
    .finally(() => {
      overrideAnchorTags("contentWrapper");
    })
    .catch(() => (error.value = true));
}

function overrideAnchorTags(elements) {
  document.getElementsByName(elements).forEach((el) => {
    el.querySelectorAll("a").forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        router.push(anchor.attributes.href.value);
      });
    });
  });
}
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
}
</style>
