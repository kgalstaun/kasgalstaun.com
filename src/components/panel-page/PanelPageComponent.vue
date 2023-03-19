<template>
  <div v-if="PanelPages" class="panel-page-wrapper">
    <div
      class="min-h-screen p-sm sm:p-lg flex flex-col items-center justify-between"
      v-for="(page, index) in PanelPages"
      :key="index"
      ref="panelPageRefs"
    >
      <TransitionGroup>
        <template v-if="page">
          <div
            class="panel-page-introduction-wrapper h-screen lg:h-full flex flex-row items-center justify-center lg:block text-center px-md sm:p-xl sm:pt-md sm:pb-xs"
            v-html="page.text.html"
          ></div>
          <PanelWrapperComponent :page="page"></PanelWrapperComponent>
          <ArrowComponent
            class="hidden lg:block"
            v-if="arrowConfig && index < PanelPages.length"
            :config="arrowConfig"
          />
        </template>
      </TransitionGroup>
    </div>
  </div>
  <ErrorComponent v-if="error"></ErrorComponent>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PanelWrapperComponent from "@/components/panel-page/PanelWrapperComponent";
import ArrowComponent from "@/components/generic/ArrowComponent";
import ErrorComponent from "@/components/generic/ErrorComponent";
import PanelPages from "@/data/PanelPages";
import QueryService from "@/service/QueryService";
import PanelPageQuery from "@/queries/PanelPageQuery";
import ArrowEnums from "@/enums/ArrowEnums";

const router = useRouter();
let error = ref(false);

const arrowConfig = {
  direction: ArrowEnums.DIRECTION.DOWN,
  size: ArrowEnums.SIZE.LG,
};

onMounted(() => {
  fetchData();
});

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
      overrideAnchorTags("panelPageWrapper");
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
