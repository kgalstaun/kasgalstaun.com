<template>
  <transition name="fade" mode="out-in">
    <footer>{{ Meta.getFooter }}</footer>
  </transition>
</template>

<script setup>
import Meta from "@/data/Meta";
</script>
