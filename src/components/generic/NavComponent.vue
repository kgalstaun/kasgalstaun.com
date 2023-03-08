<template>
  <nav class="flex flex-row">
    <template v-for="title in titles" :key="title">
      <router-link :to="'/' + title" class="cursor-pointer text-3xl">{{
        title
      }}</router-link>
    </template>
  </nav>
</template>

<script setup>
const titles = ["werk"];
</script>
