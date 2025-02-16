// src/components/PeopleList.vue
<script setup>
import Logos from './Logos.vue';
import { ref, onMounted } from 'vue';

// Reactive state
const people = ref([]);
const formData = ref({ name: '' });
const isEditing = ref(false);
const editingId = ref(null);

// Fetch people from the API
const fetchPeople = async () => {
  const response = await fetch('http://localhost:5173/api/people');
  people.value = await response.json();
};

// Handle form submission
const handleSubmit = async () => {
  if (isEditing.value) {
    // Update an existing person
    await fetch(`http://localhost:5173/api/people/${editingId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formData.value.name })
    });
    isEditing.value = false;
    editingId.value = null;
  } else {
    // Create a new person
    await fetch('http://localhost:5173/api/people', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });
  }
  formData.value.name = ''; // Clear the form
  fetchPeople(); // Refresh the list
};

// Edit a person
const editPerson = (person) => {
  formData.value.name = person.name;
  isEditing.value = true;
  editingId.value = person.id;
};

// Delete a person
const deletePerson = async (id) => {
  await fetch(`http://localhost:5173/api/people/${id}`, { method: 'DELETE' });
  fetchPeople(); // Refresh the list
};

// Fetch people when the component is mounted
onMounted(fetchPeople);
</script>

<template>
  <div>
    <h2>CRUD</h2>
    <p>Please input data to save in sqlte database</p>
    <form @submit.prevent="handleSubmit">
      <input v-model="formData.name" placeholder="Enter name" required />
      <button class="btn" type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
    </form>
    <ul>
      <li class="list" v-for="person in people" :key="person.id">
        <router-link :to="`/person/${person.id}`">{{ person.name }}</router-link>
        <button class="btn" @click="editPerson(person)">Edit</button>
        <button class="btn" @click="deletePerson(person.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>


<style>
.list {
  list-style: none;
}

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
  margin: 0;
}
</style>
