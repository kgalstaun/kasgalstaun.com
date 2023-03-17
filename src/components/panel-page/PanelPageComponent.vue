<template>
  <div v-if="PanelPages" class="panel-page-wrapper">
    <div
      class="min-h-screen p-sm sm:p-lg flex flex-col items-center justify-between"
      v-for="(page, index) in PanelPages"
      :key="index"
      ref="panelPageRefs"
    >
      <TransitionGroup>
        <template v-if="viewportRefs[index]">
          <h1 class="content-title text-center lg:hidden py-lg">
            {{ page.title }}
          </h1>
          <div
            class="content-introduction-wrapper text-center hidden lg:block px-md sm:p-xl sm:pt-md sm:pb-xs"
            v-html="page.text.html"
          ></div>
          <PanelWrapperComponent :page="page"></PanelWrapperComponent>
          <ArrowComponent
            class="hidden lg:block"
            v-if="arrowConfig && index < PanelPages.length"
            :config="{
              ...arrowConfig,
              elementRef: setElementRef(index, PanelPages),
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
import PanelPages from "@/data/PanelPages";
import QueryService from "@/service/QueryService";
import PanelPageQuery from "@/queries/PanelPageQuery";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";
import ArrowEnums from "@/enums/ArrowEnums";

const router = useRouter();
let error = ref(false);
const main = ref(null);
let panelPageRefs = ref([]);
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
  panelPageRefs,
  () => {
    if (!panelPageRefs.value || viewportRefs.value.length) return;

    panelPageRefs.value.forEach((ref, index) => {
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
  QueryService.fetch(PanelPageQuery)
    .then((response) => {
      if (response.panelPages.length > 0) {
        PanelPages.value = response.panelPages;

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
    ScrollHelper.scrollToElement(panelPageRefs.value[elementRef.value]);
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
  div:first-child {
    padding-top: 2.6rem;

    h1.content-title {
      margin-top: -2.4rem;
    }
  }
}
div:not(first-child) {
  h1.content-title {
    margin-top: -7.6rem;

    @media screen and (min-width: $screen-size-sm) {
      margin-top: -14rem;
    }
  }
}

.content-introduction {
  p {
    padding-bottom: 0rem;
  }
}
</style>
