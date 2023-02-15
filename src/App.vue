<template>
  <template v-if="loaded && !error">
    <HeaderComponent />
    <MainComponent />
    <FooterComponent>{{ getFooterText }}</FooterComponent>
    <ErrorComponent v-if="error"></ErrorComponent>
  </template>
</template>

<script>
import { ref, onMounted } from "vue";
import QueryService from "@/service/QueryService";
import MetaQuery from "@/queries/meta";
import {
  setMetaData,
  getHeaderText,
  getFooterText,
} from "@/state/metaDataState";
import HeaderComponent from "@/components/HeaderComponent.vue";
import MainComponent from "@/components/MainComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ErrorComponent from "@/components/ErrorComponent";
import DictionaryService from "@/service/DictionaryService";

export default {
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ErrorComponent,
  },
  setup() {
    onMounted(() => {
      fetchMetaData();
    });

    let loaded = ref(false);
    let error = ref(false);
    const getConstant = DictionaryService.get;

    async function fetchMetaData() {
      QueryService.fetch(MetaQuery)
        .then((data) => {
          let metaData = data.metas[0];
          setMetaData(metaData.headerText, metaData.footerText);
          loaded.value = true;
        })
        .catch(() => (error.value = true));
    }

    return {
      error,
      loaded,
      getHeaderText,
      getFooterText,
      getConstant,
    };
  },
};
</script>
