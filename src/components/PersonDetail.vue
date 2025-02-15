// src/components/PersonDetail.vue
<template>
  <div>
    <h1>{{ person.name }}</h1>
    <p>ID: {{ person.id }}</p>
    <router-link to="/people">Back to list</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const person = ref({});

    onMounted(async () => {
      const response = await fetch(`http://localhost:8000/api/people/${route.params.id}`);
      person.value = await response.json();
    });

    return { person };
  }
};
</script>
