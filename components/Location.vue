<template>
  <div v-if="isLoading"><Loader /></div>
  <div v-else>
    <div class="location-intro">
      <h3><span>NAME LOCATION:</span> {{ location?.name }}</h3>
      <p><span>TYPE LOCATION:</span> {{ location?.type }}</p>
      <p><span>DIMENSION:</span> {{ location?.dimension }}</p>
    </div>
    <div class="characters-block">
      <CharacterCard
        v-for="character in allResidents"
        :key="character.id"
        :character="character"
      />
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

const isLoading = ref(true);

onMounted(async () => {
  try {
    await store.getCharacters(props.location.residents);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

const allResidents = computed(() => store.charactersInfo);
</script>
<style scoped>
.location-intro {
  margin: 3vh;
}
</style>
