<script setup>
import { ref, onMounted } from 'vue';

const count = ref(0);

onMounted(() => {
  setInterval(() => {
    count.value++;
  }, 1000);
});

</script>

<template>
  <button class="green counterbtn" @click="count++">Click to count {{ count }}</button>
</template>

<style>
.counterbtn {
  padding: .6em 1em;
  background: #222;
  border: none;
  border-radius: 3px;
}
</style>
