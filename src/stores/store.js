import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    employees: [],
  },

  getters: {
    allEmployees: (state) => state.employees,
  },

  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    ADD_EMPLOYEE(state, employee) {
      state.employees.push(employee);
    },
    UPDATE_EMPLOYEE(state, updatedEmployee) {
      const index = state.employees.findIndex(
        (emp) => emp.id === updatedEmployee.id
      );
      if (index !== -1) state.employees.splice(index, 1, updatedEmployee);
    },
    DELETE_EMPLOYEE(state, id) {
      state.employees = state.employees.filter((emp) => emp.id !== id);
    },
  },

  actions: {
    async fetchEmployees({ commit }) {
      const data = await fetch("https://dummyjson.com/users");
      const json = await data.json();
      commit("SET_EMPLOYEES", json.users);
    },
    async addEmployee({ commit }, employee) {
      const newEmployee = { ...employee, id: Date.now() };
      commit("ADD_EMPLOYEE", newEmployee);
    },
    async updateEmployee({ commit }, employee) {
      commit("UPDATE_EMPLOYEE", employee);
    },
    async deleteEmployee({ commit }, id) {
      commit("DELETE_EMPLOYEE", id);
    },
  },

  plugins: [
    createPersistedState({
      key: "vuex-employees",
      paths: ["employees"],
      storage: window.localStorage,
    }),
  ],
});
