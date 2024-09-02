<template>
 <v-theme-provider>
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
const list = ref([
 { title: 'home', icon: 'mdi-home', to: '/' },
 { title: "Productos", icon: "mdi-package-variant-closed", to: "/products" },
 { title: "Categorias", icon: "mdi-folder-multiple", to: "/category" },
 { title: "Travesaños", icon: "mdi-package-variant-closed", to: "/crossbars" },
 { title: 'Racks', icon: 'mdi-package-variant-closed', to: '/racks' },
]);
</script>