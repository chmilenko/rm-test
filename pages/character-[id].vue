<template>
  <div class="character-params-card">
    <CharacterParams :character="character" />
  </div>
</template>
<script setup>
import { useStore } from "~/store/store.js";

const store = useStore();
const route = useRoute();
const characterId = route.params.id;
await store.fetchData();
await store.getCharacter(characterId);

const character = computed(() => store.oneCharacter);
</script>
<style scoped>
.character-params-card {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 10vh auto;
}
</style>
