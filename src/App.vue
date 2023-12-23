<!-- Layout.vue -->
<template>
  <div>
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'; // Adjust the path accordingly

export default {
  // other configurations
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
/* Add your styling for the layout here */
div {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>
