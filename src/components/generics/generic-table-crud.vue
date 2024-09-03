<script setup>
import { ref, defineProps } from 'vue';
import { useGenericFetchQueries } from '../../api/generic-fetch-querys';
import ModalGeneric from './modal-generic.vue';
let props = defineProps({
  title: String,
  columns: Array,
  mockData: Array,
  formFields: Array,
  endpoint: String,
  relations: Array,
});

//const snackbar = useSnackbar();
const dialog = ref(null);
const mode = ref('create');
let selectedItem = ref(null);

const { fetchQuery, createMutation, updateMutation, deleteMutation } = useGenericFetchQueries(props.endpoint);

const items = ref([]);

async function loadItems() {
  items.value = await fetchQuery();
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
    // snackbar.add({
    //   type: 'success',
    //   text: 'Registro actualizado correctamente',
    // });
    loadItems();
  } catch (error) {
    console.error('Failed to update data:', error);
    // snackbar.add({
    //   type: 'error',
    //   text: 'Se ha producido un error al actualizar el registro',
    // });
  }
}

async function deleteQueryhandler() {
  try {
    await deleteMutation(selectedItem.value.id);
    dialog.value.handleClose();
    // snackbar.add({
    //   type: 'success',
    //   text: 'Registro eliminado correctamente',
    // });
    loadItems();
  } catch (error) {
    console.error('Failed to delete data:', error);
    // snackbar.add({
    //   type: 'error',
    //   text: 'Se ha producido un error al eliminar el registro',
    // });
  }
}

async function createQueryhandler() {
  console.log(dialog?.value?.valueItem);
  try {
    await createMutation(dialog?.value?.valueItem);
    dialog.value.handleClose();
    // snackbar.add({
    //   type: 'success',
    //   text: 'Registro creado correctamente',
    // });
    loadItems();
  } catch (error) {
    console.error('Failed to create data:', error);
    // snackbar.add({
    //   type: 'error',
    //   text: 'Se ha producido un error al crear el registro',
    // });
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
