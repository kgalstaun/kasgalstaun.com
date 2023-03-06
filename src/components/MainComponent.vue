<template>
  <transition name="fade" mode="out-in">
    <main ref="main" class="px-lg flex flex-col items-center justify-center">
      <template v-if="Content">
        <template v-for="(content, index) in Content" :key="index">
          <ContentComponent class="py-lg" :content="content"></ContentComponent>
          <div v-if="arrowConfig" class="py-md">
            <ArrowComponent :config="arrowConfig" />
          </div>
        </template>
      </template>
    </main>
  </transition>
  <ErrorComponent v-if="error"></ErrorComponent>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ContentComponent from "@/components/ContentComponent";
import ArrowComponent from "@/components/ArrowComponent";
import Content from "@/data/Content";
import QueryService from "@/service/QueryService";
import ContentQuery from "@/queries/ContentQuery";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";
import ArrowEnums from "@/enums/ArrowEnums";

import ErrorComponent from "@/components/ErrorComponent";

const route = useRoute();
const router = useRouter();
let error = ref(false);
const main = ref(null);

const arrowConfig = {
  direction: ArrowEnums.DIRECTION.DOWN,
  size: ArrowEnums.SIZE.LG,
};

watch(route, () => {
  Content.set(null);
  fetchData();
});

watch(
  ScrollEvent.listen,
  () => {
    const element = ScrollEvent.listen.value;
    if (element && element === ElementEnums.MAIN) {
      ScrollHelper.scrollToElement(main);
    }
  },
  { deep: true }
);

onMounted(() => {
  fetchData();
});

async function fetchData() {
  const routeParam = route.params.id ? route.params.id : null;
  let queryTitle = routeParam ? routeParam : route.name;

  QueryService.fetch(ContentQuery, { title: queryTitle })
    .then((response) => {
      if (response.contentArray.length > 0) {
        Content.value = response.contentArray;
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
