<template>
    <div>
      <div class="location-intro">
        <h3><span>Name Location:</span> {{ location?.name }}</h3>
        <p><span>Type Location:</span> {{ location?.type }}</p>
        <p><span>Dimension:</span> {{ location?.dimension }}</p>
        <h3 class="residents-intro">Location residents:</h3>
      </div>
      <div class="characters-block">
        <CharacterCard
          v-for="character in allResidents"
          :key="character.id"
          :character="character"
        />
        <Intersect @intersect="store.scrollLocationResidents" />
      </div>
    </div>
  </template>
  <script setup>
  import { useStore } from "~/store/store.js";
  const props = defineProps({
    location: {},
    type: Object,
    required: true,
  });
  const store = useStore();
  await store.getCharacters(props.location.residents);
  const scroll = computed(() => store.pagination);
  
  const allResidents = computed(() =>
    store.charactersInfo.slice(0, scroll.value)
  );
  </script>
  <style scoped>
  .location-intro {
    margin: 3vh;
  }
  </style>
  