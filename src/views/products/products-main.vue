<script setup>
import GenericTableCrud from '../../components/generics/generic-table-crud.vue';

import { ref } from 'vue';

let title = ref('Productos');
let columns = ref([
  { id: 0, key: 'name', title: 'Nombre' },
  { id: 1, key: 'category_name', title: 'Categoria' },
  { id: 2, key: 'shelve_name', title: 'Shelve' },
  { id: 3, key: 'rack_name', title: 'Rack' },
]);
let endpoint = ref('products');
let formFields = ref([
  { key: 'name', label: 'Nombre', value: '', rules: [v => !!v || 'Name is required'] },
  { key: 'quantity', label: 'Quantity', value: '', rules: [v => !!v || 'Quantity is required'] },
  { key: 'description', label: 'Descripción', value: '', rules: [v => !!v || 'Description is required'] },
  { key: 'category_name', fk: 'category_id', label: 'Category', value: '', selector: true },
  { key: 'shelve_name', fk: 'shelve_id', label: 'Shelve', value: '', selector: true },
  { key: 'rack_name', fk: 'rack_id', label: 'Rack', value: '', selector: true },
]);
let relations = ref([
  { key: 'category_id', endpoint: 'categories' },
  { key: 'shelve_id', endpoint: 'shelves' },
  { key: 'rack_id', endpoint: 'racks' }
]);
</script>
<template>
  <generic-table-crud :title="title" :columns="columns" :endpoint="endpoint" :formFields="formFields"
    :relations="relations" />
</template>
