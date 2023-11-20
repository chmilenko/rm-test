<template>
  <Location :location="location" />
</template>
<script setup>
import { useStore } from "~/store/store.js";
const store = useStore();
const route = useRoute();

await store.fetchData();
const locationId = route.params.id;
await store.getLocation(locationId);
const location = computed(() => store.location);
</script>
<style scoped></style>
