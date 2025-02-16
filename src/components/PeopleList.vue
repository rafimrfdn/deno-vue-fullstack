// src/components/PeopleList.vue
<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const people = ref([]);
    const formData = ref({ name: '' });
    const isEditing = ref(false);
    const editingId = ref(null);

    const fetchPeople = async () => {
      const response = await fetch('http://localhost:8000/api/people');
      people.value = await response.json();
    };

    const handleSubmit = async () => {
      if (isEditing.value) {
        await fetch(`http://localhost:8000/api/people/${editingId.value}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.value.name })
        });
        isEditing.value = false;
        editingId.value = null;
      } else {
        await fetch('http://localhost:8000/api/people', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData.value)
        });
      }
      formData.value.name = '';
      fetchPeople();
    };

    const editPerson = (person) => {
      formData.value.name = person.name;
      isEditing.value = true;
      editingId.value = person.id;
    };

    const deletePerson = async (id) => {
      await fetch(`http://localhost:8000/api/people/${id}`, { method: 'DELETE' });
      fetchPeople();
    };

    onMounted(fetchPeople);

    return { people, formData, handleSubmit, editPerson, deletePerson, isEditing };
  }
};
</script>

<template>
  <div>
    <h1>CRUD</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" placeholder="Enter name" required />
      <button class="btn" type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>
    <ul>
      <li v-for="person in people" :key="person.id">
        <router-link :to="`/person/${person.id}`">{{ person.name }}</router-link>
        <button class="btn" @click="editPerson(person)">Edit</button>
        <button class="btn" @click="deletePerson(person.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>


<style>
.btn {
  border: none;
  padding: .3em .6em;
  background: #444;
  margin: .2em;
  border-radius: 3px;
  color: #ddd;
}

input {
  background: none;
  color: #ddd;
  border: 1px solid hsla(160, 100%, 37%, 1);
  border-radius: 3px;
  padding: .3em .6em;
}
</style>
