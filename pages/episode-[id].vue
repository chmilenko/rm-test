<template>
  <Episode :episode="episode" />
</template>

<script setup>
import { useStore } from "~/store/store.js";

const store = useStore();
const route = useRoute();

await store.fetchData();

const episodeId = route.params.id;
await store.getEpisode(episodeId);
const episode = computed(() => store.oneEpisode);
</script>

<style scoped></style>
