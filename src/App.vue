<template>
  <main>
    <template v-if="loaded && !error">
      <HeaderComponent>{{ getHeaderText }}</HeaderComponent>
      <ContentComponent />
      <FooterComponent>{{ getFooterText }}</FooterComponent>
      <ErrorComponent v-if="error"></ErrorComponent>
    </template>
  </main>
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
import ContentComponent from "@/components/ContentComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ErrorComponent from "@/components/ErrorComponent";
import ConstantService from "@/service/ConstantService";

export default {
  components: {
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ErrorComponent,
  },
  setup() {
    onMounted(() => {
      fetchMetaData();
    });

    let loaded = ref(false);
    let error = ref(false);
    const getConstant = ConstantService.get;

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
