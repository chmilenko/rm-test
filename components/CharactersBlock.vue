<template>
  <div class="filters">
    <input
      placeholder="Name search"
      v-model="searchName"
      class="input-search-name"
    />
    <select v-model="searchSpecies">
      <option value="" disabled>Filter species...</option>
      <option>Human</option>
      <option>Alien</option>
    </select>
    <button @click="clearFilters">Сбросить фильтр</button>
  </div>
  <div class="characters-block">
    <CharacterCard
      v-for="character in filteredCharacters"
      :key="character.id"
      :character="character"
    />
    <Intersect @intersect="store.fetchNextPage" />
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
    const nameMatch =
      character.name &&
      character.name.toLowerCase().includes(searchName.value.toLowerCase());
    const speciesMatch =
      searchSpecies.value.length === 0 ||
      searchSpecies.value.includes(character.species);
    return nameMatch && speciesMatch;
  });
});
const clearFilters = () => {
  searchName.value = "";
  searchSpecies.value = [];
};
</script>

<style scoped>
.filters {
  margin: 5vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-search-name,
select {
  height: 30px;
  width: 120px;
}
</style>
