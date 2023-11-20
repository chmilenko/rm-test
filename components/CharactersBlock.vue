<template>
  <div>
    <div class="filters">
      <input placeholder="Name search" v-model="searchName" />
      <select multiple v-model="searchSpecies">
        <option>Human</option>
        <option>Alien</option>
      </select>
    </div>
    <div class="charactersBlock">
      <CharacterCard
        v-for="character in filteredCharacters"
        :key="character.id"
        :character="character"
      />
      <Intersect @intersect="store.fetchNextPage" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "~/store/store.js";

const store = useStore();
await store.fetchData();
await store.getCharacters();

const allCharacters = computed(() => store.charactersInfo);

const searchName = ref("");
const searchSpecies = ref([]);

const filteredCharacters = computed(() => {
  return allCharacters.value.filter((character) => {
    const nameMatch = character.name
      .toLowerCase()
      .includes(searchName.value.toLowerCase());
    const speciesMatch =
      searchSpecies.value.length === 0 ||
      searchSpecies.value.includes(character.species);
    return nameMatch && speciesMatch;
  });
});
</script>

<style scoped>
.charactersBlock {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 10vh auto;
}
</style>
