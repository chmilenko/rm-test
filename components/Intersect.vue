<template>
  <div ref="observerElement" class="observer" />
</template>

<script setup>
const options = {
  root: null,
  rootMargin: "50px",
  threshold: 1.0,
};
const emit = defineEmits(["intersect"]);

const observerElement = ref(null);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit("intersect");
    }
  }, options);

  if (observerElement.value) observer.observe(observerElement.value);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>
