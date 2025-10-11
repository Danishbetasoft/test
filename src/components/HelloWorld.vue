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
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      newName: "",
      editingId: null,
      editedName: "",
    };
  },
  computed: {
    ...mapGetters(["allEmployees"]),
    employees() {
      return this.allEmployees;
    },
  },
  methods: {
    ...mapActions([
      "fetchEmployees",
      "addEmployee",
      "updateEmployee",
      "deleteEmployee",
    ]),

    addNewEmployee() {
      if (this.newName.trim()) {
        this.addEmployee({ username: this.newName.trim() });
        this.newName = "";
      }
    },

    remove(id) {
      this.deleteEmployee(id);
    },

    startEdit(emp) {
      this.editingId = emp.id;
      this.editedName = emp.username;
    },

    save(emp) {
      if (this.editedName.trim()) {
        this.updateEmployee({ ...emp, username: this.editedName.trim() });
      }
      this.cancelEdit();
    },

    cancelEdit() {
      this.editingId = null;
      this.editedName = "";
    },
  },
  mounted() {
    if (!this.employees.length) {
      this.fetchEmployees();
    }
  },
};
</script>
