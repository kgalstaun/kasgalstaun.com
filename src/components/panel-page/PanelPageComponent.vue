<template>
  <div v-if="Content" class="panel-page-wrapper">
    <div
      class="min-h-screen p-sm sm:p-lg flex flex-col items-center justify-between"
      v-for="(content, index) in Content"
      :key="index"
      ref="contentRefs"
    >
      <TransitionGroup>
        <template v-if="viewportRefs[index]">
          <div
            class="content-introduction-wrapper text-center px-md pb-md sm:p-xl sm:pt-md sm:pb-xs"
            v-html="content.text.html"
          ></div>
          <PanelWrapperComponent :content="content"></PanelWrapperComponent>
          <ArrowComponent
            class="hidden sm:block"
            v-if="arrowConfig && index < Content.length"
            :config="{
              ...arrowConfig,
              elementRef: setElementRef(index, Content),
            }"
          />
        </template>
      </TransitionGroup>
    </div>
  </div>
  <ErrorComponent v-if="error"></ErrorComponent>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import PanelWrapperComponent from "@/components/panel-page/PanelWrapperComponent";
import ArrowComponent from "@/components/generic/ArrowComponent";
import ErrorComponent from "@/components/generic/ErrorComponent";
import IntersectionHelper from "@/helpers/IntersectionHelper";
import Content from "@/data/Content";
import QueryService from "@/service/QueryService";
import ContentQuery from "@/queries/ContentQuery";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";
import ArrowEnums from "@/enums/ArrowEnums";

const router = useRouter();
let error = ref(false);
const main = ref(null);
let contentRefs = ref([]);
let viewportRefs = ref([]);

const arrowConfig = {
  elementRef: { section: ElementEnums.CONTENT },
  direction: ArrowEnums.DIRECTION.DOWN,
  size: ArrowEnums.SIZE.LG,
};

onMounted(() => {
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

const unwatch = watch(
  contentRefs,
  () => {
    if (!contentRefs.value || viewportRefs.value.length) return;

    contentRefs.value.forEach((ref, index) => {
      viewportRefs.value.push(false);
      IntersectionHelper.createObserver(ref, viewportRefs.value, index).observe(
        ref
      );
    });

    unwatch();
  },
  { deep: true }
);

async function fetchData() {
  QueryService.fetch(ContentQuery)
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
    ScrollHelper.scrollToElement(contentRefs.value[elementRef.value]);
  } else {
    if (elementRef.section === ElementEnums.MAIN) {
      ScrollHelper.scrollToElement(main.value);
    }
  }
}

function setElementRef(index, contentArray) {
  if (index + 1 < contentArray.length) {
    return {
      section: ElementEnums.CONTENT,
      value: index + 1,
    };
  } else if (index + 1 === contentArray.length) {
    return {
      section: ElementEnums.MOTIVATION,
    };
  }
}
</script>

<style lang="scss" scoped>
.panel-page-wrapper {
  // hier moet een media query bij
  div:first-child {
    padding-top: 2.6rem;
  }
}
.content-introduction {
  p {
    padding-bottom: 0rem;
  }
}
</style>
