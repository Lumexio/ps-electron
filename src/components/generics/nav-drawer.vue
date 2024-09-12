<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      STOCKIT
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-switch :prepend-icon="iconTheme" class="mr-3" @click="setDark" v-model="darkMode" hide-details inset></v-switch>
  </v-app-bar>
  <v-navigation-drawer app v-model="drawer">
    <v-list>
      <v-list-item :append-icon="item.icon" v-for="item in items" :key="item.title" :to="item.to">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from 'vue'
import { useStore } from '../../store'

const store = useStore();
const props = defineProps({
  items: Array,
});

let drawer = ref(false);
let iconTheme = computed(() => (darkMode.value ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny'));
const darkMode = computed({
  get() {
    return store.hasDarkMode === 'dark';
  },
  set(value) {
    store.setDarkMode(value ? 'dark' : 'light');
  }
});

onMounted(() => {
  hasDarkMode();
});

function setDark() {
  store.setDarkMode(darkMode.value ? 'light' : 'dark');

}

function hasDarkMode() {
  return store.hasDarkMode === 'dark';
}
</script>