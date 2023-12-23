<template>
  <div>
    <h2 class="my-4">Lista de Eventos</h2>
    
    <!-- Agregar campo de búsqueda -->
    <div class="mb-3">
      <label for="searchInput" class="form-label">Buscar por nombre:</label>
      <input type="text" v-model="searchTerm" class="form-control" id="searchInput">
    </div>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Fecha de inicio</th>
          <th>Fecha de fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Filtrar eventos por nombre -->
        <tr v-for="event in filteredEvents" :key="event.id">
          <td>{{ event.id }}</td>
          <td>{{ event.title }}</td>
          <td>{{ event.start }}</td>
          <td>{{ event.end }}</td>
          <td>
            <button @click="removeEvent(event.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';

export default defineComponent({
  data() {
    return {
      searchTerm: '', // Nuevo dato para almacenar el término de búsqueda
    };
  },
  computed: {
    ...mapGetters(['events']),
    // Filtrar eventos por nombre
    filteredEvents() {
      return this.events.filter(event =>
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    ...mapActions(['removeEvent']),
  },
});
</script>
