<template>
  <div class="character-card">
    <button class="params-btn">
      <img
        alt="avatar"
        :src="character?.image"
        @click="() => navigateCharacter(character.id)"
        сlass="image-character"
      />
    </button>
    <h2 class="character-name"><span>NAME:</span> {{ character?.name }}</h2>
    <h3 class="character-species">
      <span>SPECIES:</span> {{ character?.species }}
    </h3>
    <p class="participation-intro">PARTICIPATION IN EPISODES,</p>
    <div class="episode-character">
      <label for="select-episode">SEARCH EPISODE:</label>
      <select
        id="select-episode"
        v-model="selectEpisode"
        @change="handleEpisodeSelection"
      >
        <option selected disabled>Please select...</option>
        <option
          v-for="(oneEpisode, index) in character?.episode?.slice(0, 5)"
          :key="oneEpisode"
          :value="oneEpisode"
        >
          Episode {{ index + 1 }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "~/store/store";
import { useNavigate } from "~/composables/navigateHook";

defineProps({
  character: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const { navigate } = useNavigate();

const selectEpisode = ref(null);
const navigateEpisode = (link) => navigate(link, "/episode", store.getEpisode);
const navigateCharacter = (link) =>
  navigate(link, "/character", store.getCharacter);

const handleEpisodeSelection = () => {
  if (selectEpisode.value !== null) {
    navigateEpisode(selectEpisode.value);
  }
};

watch(selectEpisode, (newValue) => {
  if (newValue === null) {
    selectEpisode.value = "";
  }
});
</script>
<style>
.character-card {
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
}
</style>
