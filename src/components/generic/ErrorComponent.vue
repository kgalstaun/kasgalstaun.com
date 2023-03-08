<template>
  <MessageComponent class="pt-xl text-5xl" :type="'error'">{{
    getText("messages", "error")
  }}</MessageComponent>
</template>

<script setup>
import MessageComponent from "@/components/generic/MessageComponent";
import DictionaryService from "@/service/DictionaryService";

const getText = DictionaryService.get;
</script>
