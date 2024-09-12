<template>
 <v-theme-provider :theme="store.hasDarkMode">
  <v-responsive>
   <v-app>
    <nav-drawer :items="list" />
    <v-main>
     <router-view />
    </v-main>
   </v-app>
  </v-responsive>
 </v-theme-provider>
</template>

<script setup>
import { ref } from 'vue'
import NavDrawer from './components/generics/nav-drawer.vue'
import useStore from './store'
const store = useStore()


const list = ref([
 // { title: 'home', icon: 'mdi-home', to: '/' },
 { title: "Products", icon: "mdi-package-variant-closed", to: "/products" },
 { title: "Categories", icon: "mdi-folder-multiple", to: "/category" },
 { title: "Racks", icon: "mdi-package-variant-closed", to: "/racks" },
 { title: 'Shelves', icon: 'mdi-package-variant-closed', to: '/shelves' },
]);
</script>