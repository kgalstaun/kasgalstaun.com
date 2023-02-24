<template>
  <transition name="fade" mode="out-in">
    <main ref="main">
      <div
        v-if="getContent && getContent.html"
        name="contentWrapper"
        :key="getContent"
        v-html="getContent.html"
      ></div>
    </main>
  </transition>
  <ErrorComponent v-if="error"></ErrorComponent>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { setContent, resetContent, getContent } from "@/state/contentState";
import QueryService from "@/service/QueryService";
import DataQuery from "@/queries/data";
import ScrollIntoViewEvent from "@/events/ScrollIntoViewEvent";
import ScrollIntoViewHelper from "@/helpers/ScrollIntoViewHelper";
import ElementEnums from "@/enums/ElementEnums";
import ErrorComponent from "@/components/ErrorComponent";

const route = useRoute();
const router = useRouter();
let error = ref(false);
const main = ref(null);

watch(route, () => {
  resetContent();
  fetchData();
});

watch(ScrollIntoViewEvent.listen, () => {
  const element = ScrollIntoViewEvent.listen.value;
  if (element && element === ElementEnums.MAIN) {
    ScrollIntoViewHelper.scroll(main);
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
        setContent(response.dataItems[0]);
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
