<template>
  <CharactersBlock />
</template>
<script setup>
import { useStore } from "~/store/store.js";

const store = useStore();

await store.fetchData();
</script>
<style scoped></style>
