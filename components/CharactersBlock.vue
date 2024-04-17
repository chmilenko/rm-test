<template>
  <div v-if="!allCharacters.length"><Loader /></div>
  <div v-else>
    <div class="filters">
      <input
        placeholder="Name search"
        v-model="searchName"
        class="input-search-name"
      />
      <select
        v-model="searchSpecies"
        placeholder="Filter species..."
        class="select-gender"
      >
        <option>Human</option>
        <option>Alien</option>
      </select>
      <button @click="clearFilters" class="reset_btn">Сбросить фильтр</button>
    </div>
    <div class="characters-block">
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
.characters-block {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 3vh;
  justify-items: center;
}
.reset_btn {
  outline: none;
  border: 1px solid white;
  background-color: gray;
  border-radius: 6px;
  height: 30px;
  width: 130px;
  color: white;
}
.reset_btn:active {
  color: gray;
  background-color: white;
}
.filters {
  margin: 5vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1vh;
}
.input-search-name,
.select-gender {
  height: 30px;
  width: 180px;
  padding: 8px 12px;
  border: 1px solid black;
  border-radius: 6px;
}
</style>
