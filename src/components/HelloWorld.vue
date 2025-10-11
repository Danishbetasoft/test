<template>
  <div class="p-4 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">Employee Management</h2>

    <form @submit.prevent="addNewEmployee" class="mb-6 flex gap-2">
      <input
        v-model="newName"
        placeholder="Enter name"
        class="border border-gray-300 px-4 py-2 rounded w-full"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="emp in employees"
        :key="emp.id"
        class="bg-white shadow-md p-4 rounded border"
      >
        <div v-if="editingId === emp.id">
          <input
            v-model="editedName"
            class="border border-gray-300 px-3 py-2 rounded w-full mb-2"
          />
          <div class="flex gap-2">
            <button
              @click="save(emp)"
              class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
        <div v-else>
          <p class="text-lg font-semibold mb-2">{{ emp.username }}</p>
          <div class="flex gap-2">
            <button
              @click="startEdit(emp)"
              class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="remove(emp.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
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
