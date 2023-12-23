<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <label for="country">Selecciona un país:</label>
      <select v-model="selectedCountry" @change="fetchHolidays">
        <option v-for="country in countries" :key="country" :value="country">
          {{ country }}
        </option>
      </select>
    </div>
    <div class="mt-5">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters, mapActions } from "vuex";

export default defineComponent({
  components: {
    FullCalendar,
  },
  computed: {
    ...mapGetters(["events"]),
  },
  data() {
    return {
      selectedCountry: "US", // o cualquier valor predeterminado que desees
      countries: ["US", "GB", "CA", "AU", "DE"],
      holidays: [],
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        events: this.events,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
      },
    };
  },
  methods: {
    ...mapActions(["addEvent", "removeEvent", "updateEvent"]),
    handleDateSelect(selectInfo) {
      const title = prompt("Adicionar nota");
      if (title) {
        const event = {
          id: this.$store.state.eventIdCounter + 1,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        };
        this.addEvent(event);
      }
    },
    handleEventClick(clickInfo) {
      const title = prompt("Editar nota", clickInfo.event.title);

      // Verifica si title no es null antes de continuar
      if (title !== null) {
        const updatedEvent = {
          id: clickInfo.event.id,
          title,
          start: clickInfo.event.start.toISOString(),
          end: clickInfo.event.end ? clickInfo.event.end.toISOString() : null,
          allDay: clickInfo.event.allDay,
        };

        this.updateEvent(updatedEvent);
      }
    },
    async fetchHolidays() {
      try {
        const response = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/${
            this.selectedCountry
          }`
        );
        this.holidays = response.data.map((holiday) => ({
          title: holiday.name,
          start: holiday.date,
          allDay: true,
        }));
      } catch (error) {
        console.error("Error al obtener los días feriados", error);
      }
    },
  },
  watch: {
    events: {
      handler(events) {
        this.calendarOptions.events = events;
      },
      immediate: true,
    },
    selectedCountry: "fetchHolidays",
  },
});
</script>
