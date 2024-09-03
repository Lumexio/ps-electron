<script setup>
import GenericTableCrud from '../../components/generics/generic-table-crud.vue';

import { ref } from 'vue';

let title = ref('Products');
let columns = ref([
  { id: 0, key: 'name', title: 'Name' },
  { id: 1, key: 'category_name', title: 'Category' },
  { id: 2, key: 'rack_name', title: 'Rack' },
  { id: 3, key: 'crossbar_name', title: 'Crossbar' },
]);
let endpoint = ref('products');
let formFields = ref([
  { key: 'name', label: 'Nombre', value: '', rules: [v => !!v || 'Name is required'] },
  { key: 'quantity', label: 'Quantity', value: '', rules: [v => !!v || 'Quantity is required'] },
  { key: 'description', label: 'Descripción', value: '', rules: [v => !!v || 'Description is required'] },
  { key: 'category_name', fk: 'category_id', label: 'Category', value: '', selector: true },
  { key: 'rack_name', fk: 'rack_id', label: 'Rack', value: '', selector: true },
  { key: 'crossbar_name', fk: 'crossbar_id', label: 'Crossbar', value: '', selector: true },
]);
let relations = ref([
  { key: 'category_id', endpoint: 'categories' },
  { key: 'rack_id', endpoint: 'racks' },
  { key: 'crossbar_id', endpoint: 'crossbars' }
]);
</script>
<template>
  <generic-table-crud :title="title" :columns="columns" :endpoint="endpoint" :formFields="formFields"
    :relations="relations" />
</template>
