// src/components/PersonDetail.vue
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const person = ref({});

onMounted(async () => {
  const response = await fetch(`http://localhost:5173/api/people/${route.params.id}`);
  person.value = await response.json();
});
</script>

<template>
  <div>
    <h1>{{ person.name }}</h1>
    <p>ID: {{ person.id }}</p>
    <router-link to="/people">Back to list</router-link>
  </div>
</template>
