<template>
  <div class="p-4">
    <h2>Employee Management</h2>

    <form @submit.prevent="addNewEmployee">
      <input v-model="newName" placeholder="Enter name" />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="emp in employees" :key="emp.id">
        <div v-if="editingId === emp.id">
          <input v-model="editedName" />
          <button @click="save(emp)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
        <div v-else>
          {{ emp.username }}
          <button @click="startEdit(emp)">Edit</button>
          <button @click="remove(emp.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const newName = ref("");
const editingId = ref(null);
const editedName = ref("");

const employees = computed(() => store.getters.allEmployees);

const fetchEmployees = () => store.dispatch("fetchEmployees");
const addEmployee = (payload) => store.dispatch("addEmployee", payload);
const updateEmployee = (payload) => store.dispatch("updateEmployee", payload);
const deleteEmployee = (id) => store.dispatch("deleteEmployee", id);

const addNewEmployee = () => {
  if (newName.value.trim()) {
    addEmployee({ username: newName.value.trim() });
    newName.value = "";
  }
};

const remove = (id) => {
  deleteEmployee(id);
};

const startEdit = (emp) => {
  editingId.value = emp.id;
  editedName.value = emp.username;
};

const save = (emp) => {
  if (editedName.value.trim()) {
    updateEmployee({ ...emp, username: editedName.value.trim() });
  }
  cancelEdit();
};

const cancelEdit = () => {
  editingId.value = null;
  editedName.value = "";
};

onMounted(() => {
  if (!employees.value.length) {
    fetchEmployees();
  }
});
</script>
