<template>
  <div v-if="isLoading"><Loader /></div>
  <div>
    <div class="episode-intro">
      <h2><span>EPISODE NAME:</span> {{ episode?.name }}</h2>
      <p><span>EPISODE DATA:</span> {{ episode?.air_date }}</p>
      <h3>CHARACTERS:</h3>
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

const isLoading = ref(true);

const store = useStore();

onMounted(async () => {
  try {
    await store.getCharacters(props.episode.characters);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

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
  gap: 1vh;
}
</style>
