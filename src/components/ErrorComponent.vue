<template>
  <MessageComponent class="pt-xl text-5xl" :type="'error'">{{
    getText("messages", "error")
  }}</MessageComponent>
</template>

<script>
import MessageComponent from "@/components/MessageComponent";
import DictionaryService from "@/service/DictionaryService";

export default {
  components: {
    MessageComponent,
  },
  setup() {
    const getText = DictionaryService.get;
    return {
      getText,
    };
  },
};
</script>
