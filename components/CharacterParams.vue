<template>
  <div>
    <button class="params-btn disabled">
      <img
        alt="avatar"
        :src="character?.image"
        class="imageCardParams"
        @click="() => navigateCharacter(character.id)"
      />
    </button>
    <h2><span>Name:</span> {{ character?.name }}</h2>
    <h3><span>Species: </span>{{ character?.species }}</h3>

    <div class="check-location">
      <button
        @click="() => navigateLocation(character?.location?.url)"
        class="location-btn"
      >
        <span>Check Location:</span>
        <h3>{{ character?.location?.name }}</h3>
      </button>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "~/store/store.js";
import { useNavigate } from "~/composables/navigateHook";

defineProps({
  character: {},
  type: Object,
  required: true,
});

const store = useStore();
const { navigate } = useNavigate();

const navigateCharacter = (link) =>
  navigate(link, `/character`, store.getCharacter);
const navigateLocation = (link) => {
  navigate(link, `/location`, store.getLocation);
};
</script>
<style scoped>
.check-location {
  display: inline;
}
.location-btn {
  background-color: white;
}
</style>
