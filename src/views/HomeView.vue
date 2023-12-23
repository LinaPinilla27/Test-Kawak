<template>
  <div class="home">
    <ListaNotas />
  </div>
</template>

<script>
import ListaNotas from '@/components/ListaNotas.vue'
import AddNotas from '@/components/AddNotas.vue'

export default {
  name: 'HomeView',
  components: {
    ListaNotas,
    AddNotas
  }
}
</script>
