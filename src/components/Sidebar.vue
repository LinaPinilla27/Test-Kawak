<!-- Sidebar.vue -->
<template>
  <div :class="{ 'sidebar-open': sidebarOpen }">
    <button @click="toggleSidebar" class="toggle-button">
      <i v-if="sidebarOpen" class="fas fa-bars"></i>
      <i v-else class="fas fa-times"></i>
    </button>
    <div class="menu-container">
      <router-link to="/about" class="menu-item">
        <span v-if="sidebarOpen">Calendario</span>
        <i v-else class="fas fa-info-circle"></i>
      </router-link>
      <router-link to="/" class="menu-item">
        <span v-if="sidebarOpen">Listar Notas</span>
        <i v-else class="fas fa-home"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const sidebarOpen = ref(true);

    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
      store.commit('toggleSidebar');
    };

    return {
      sidebarOpen,
      toggleSidebar,
    };
  },
};
</script>

<style scoped>
/* Add your styling for the sidebar here */
div {
  width: 200px;
  height: 100%;
  background-color: #3498db;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  transition: width 0.5s;
}

.sidebar-open {
  width: 200px;
}

.toggle-button {
  color: #fff;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin: 10px;
}

.menu-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s;
}

.menu-item i {
  margin-right: 10px;
}

.menu-item:hover {
  background-color: #2980b9;
}

/* Add Font Awesome styles */
@import url('~@fortawesome/fontawesome-free/css/all.css');
</style>