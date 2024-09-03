<script setup>
import { ref, defineProps } from 'vue';
import { useGenericFetchQueries } from '../../api/generic-fetch-querys';
import ModalGeneric from './modal-generic.vue';
import { useToast } from 'vue-toast-notification';

let props = defineProps({
  title: String,
  columns: Array,
  mockData: Array,
  formFields: Array,
  endpoint: String,
  relations: Array,
});

const toast = useToast();
const dialog = ref(null);
const mode = ref('create');
let selectedItem = ref(null);

const { fetchQuery, fetchRelatedData, createMutation, updateMutation, deleteMutation } = useGenericFetchQueries(props.endpoint);

const items = ref([]);

async function loadItems() {
  const { products, categories, racks, crossbars } = await fetchRelatedData();

  switch (props.endpoint) {
    case 'products':
      items.value = products.map(product => ({
        ...product,
        category_name: categories.find(category => category.id === product.category_id)?.name || '',
        rack_name: racks.find(rack => rack.id === product.rack_id)?.name || '',
        crossbar_name: crossbars.find(crossbar => crossbar.id === product.crossbar_id)?.name || '',
      }));
      break;
    case 'categories':
      items.value = categories;
      break;
    case 'racks':
      items.value = racks;
      break;
    case 'crossbars':
      items.value = crossbars;
      break;
    default:
      items.value = [];
      break;
  }
}

loadItems();

function openModal(modalMode, item = null) {
  mode.value = modalMode;
  selectedItem.value = item;
  dialog.value.handleOpen();
}

async function updateQueryhandler() {
  try {
    await updateMutation(dialog?.value?.valueItem);
    dialog.value.handleClose();
    toast.success('Registro actualizado correctamente');
    loadItems();
  } catch (error) {
    console.error('Failed to update data:', error);
    toast.error('Se ha producido un error al actualizar el registro');
  }
}

async function deleteQueryhandler() {
  try {
    await deleteMutation(selectedItem.value.id);
    dialog.value.handleClose();
    toast.success('Registro eliminado correctamente');
    loadItems();
  } catch (error) {
    console.error('Failed to delete data:', error);
    toast.error('Se ha producido un error al eliminar el registro');
  }
}

async function createQueryhandler() {
  try {
    await createMutation(dialog?.value?.valueItem);
    dialog.value.handleClose();
    toast.success('Registro creado correctamente');
    loadItems();
  } catch (error) {
    console.error('Failed to create data:', error);
    toast.error('Se ha producido un error al crear el registro');
  }
}
</script>

<template>
  <div>
    <v-toolbar class="pa-2">
      <h2>{{ props.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn @click="openModal('create')" color="primary" variant="tonal">Crear</v-btn>
    </v-toolbar>

    <v-table loading="true" fixed-header>
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column?.id">
            {{ column?.title }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in items" :key="data?.id">
          <td v-for="column in props.columns" :key="column?.id">
            {{ data[column?.key] }}
          </td>
          <td>
            <v-btn @click="openModal('edit', data)" density="comfortable" color="primary" icon="mdi-pencil" />
            <v-btn @click="openModal('delete', data)" density="comfortable" color="error" icon="mdi-delete" />
          </td>
        </tr>
      </tbody>
    </v-table>

    <modal-generic ref="dialog" :title="props?.title" :formFields="props?.formFields" :mode="mode" :item="selectedItem"
      :relations="props?.relations">
      <template #buttonAction>
        <v-btn v-if="mode === 'create'" @click="createQueryhandler" color="primary" variant="tonal">
          Guardar <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn v-if="mode === 'edit'" @click="updateQueryhandler" color="primary" variant="tonal">
          Guardar <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn v-if="mode === 'delete'" @click="deleteQueryhandler" color="error" variant="tonal">
          Confirmar <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </modal-generic>
  </div>
</template>
