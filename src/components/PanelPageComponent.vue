<template>
  <transition name="fade" mode="out-in">
    <div v-if="Content">
      <div
        class="h-screen p-lg flex flex-col items-center justify-between"
        v-for="(content, index) in Content"
        :key="index"
        ref="contentRefs"
      >
        <div
          class="content-introduction-wrapper text-center px-xl pt-md"
          v-html="content.text.html"
        ></div>
        <ContentComponent :content="content"></ContentComponent>
        <ArrowComponent
          v-if="arrowConfig && index < Content.length"
          :config="{
            ...arrowConfig,
            elementRef: {
              section: ElementEnums.CONTENT,
              value: index + 1,
            },
          }"
        />
      </div>
    </div>
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
let contentRefs = ref([]);

const arrowConfig = {
  elementRef: { section: ElementEnums.CONTENT },
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
    const elementRef = ScrollEvent.listen.value;
    if (!elementRef) return;
    scrollToElement(elementRef);
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

function scrollToElement(elementRef) {
  if (elementRef.section === ElementEnums.CONTENT) {
    console.log(contentRefs.value[elementRef.value]);
    ScrollHelper.scrollToElement(contentRefs.value[elementRef.value]);
  } else {
    if (elementRef.section === ElementEnums.MAIN) {
      ScrollHelper.scrollToElement(main.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.content-introduction {
  p {
    padding-bottom: 0rem;
  }
}
</style>
