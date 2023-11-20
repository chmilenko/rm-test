<template>
  <div>
    <div class="episode-intro">
      <h2><span>Episode Name:</span> {{ episode?.name }}</h2>
      <p><span>Episode date:</span> {{ episode?.air_date }}</p>
      <h3>Characters:</h3>
    </div>
    <div class="characters-block">
      <CharacterParams
        v-for="character in allCharacters"
        :key="character"
        :character="character"
      />
    </div>
  </div>
</template>
<script setup>
import { useStore } from "~/store/store.js";
const props = defineProps({
  episode: {},
  type: Object,
  required: true,
});

const store = useStore();
await store.getCharacters(props.episode.characters);

const allCharacters = computed(() => store.charactersInfo);
</script>
<style scoped>
.episode-intro {
  margin: 1vh;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>
