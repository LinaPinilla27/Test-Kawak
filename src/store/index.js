import { createStore } from 'vuex';

export default createStore({
  state: {
    sidebarOpen: false,
    events: [],
    eventIdCounter: 0,
  },
  getters: {
    // Define el getter events aquí
    events: state => state.events,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addEvent(state, event) {
      event.id = state.events.length + 1;
      state.events.push(event);
    },
    removeEvent(state, eventId) {
      state.events = state.events.filter(event => event.id !== eventId);
    },
    updateEvent(state, updatedEvent) {
      const index = state.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events.splice(index, 1, updatedEvent);
      }
    },
  },
  actions: {
    async toggleSidebarAsync({ commit }) {
      commit('toggleSidebar');
    },
    addEvent({ commit }, event) {
      commit('addEvent', event);
    },
    removeEvent({ commit }, eventId) {
      commit('removeEvent', eventId);
    },
    updateEvent({ commit }, updatedEvent) {
      commit('updateEvent', updatedEvent);
    },
  },
  modules: {
  }
});