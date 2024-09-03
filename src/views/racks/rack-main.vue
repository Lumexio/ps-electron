<template>
  <generic-table-crud :title="title" :columns="columns" :endpoint="endpoint" :formFields="formFields" />
</template>

<script setup>
import GenericTableCrud from '../../components/generics/generic-table-crud.vue';
import { ref } from 'vue';
let title = ref('Racks');
let columns = ref([
  { id: 0, key: 'id', title: 'ID' },
  { id: 1, key: 'name', title: 'Name' },
]);
let endpoint = ref('racks');
let formFields = ref([
  { key: 'name', label: 'Nombre', value: '', rules: [v => !!v || 'Name is required'] },
  { key: 'description', label: 'Descripción', value: '', rules: [v => !!v || 'Description is required'] },
]);

</script>
