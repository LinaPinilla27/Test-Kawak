<template>
  <div>
    <h2 class="my-4">Lista de Eventos</h2>
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
        <tr v-for="event in events" :key="event.id">
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
  computed: {
    ...mapGetters(['events']),
  },
  methods: {
    ...mapActions(['removeEvent']),
  },
});
</script>
