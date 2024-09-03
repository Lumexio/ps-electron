import { getAll, add, update, remove } from './indexeddb';

export function useGenericFetchQueries(endpoint) {
  const fetchQuery = async () => {
    return await getAll(endpoint);
  };

  const fetchRelatedData = async () => {
    const products = await getAll('products');

    const categories = await getAll('categories');

    const racks = await getAll('racks');
    const crossbars = await getAll('crossbars');


    return { products, categories, racks, crossbars };
  };

  const createMutation = async (newData) => {
    // Sanitize the object to ensure it only contains serializable properties
    const sanitizedData = JSON.parse(JSON.stringify(newData));

    await add(endpoint, sanitizedData);
  };

  const updateMutation = async (updatedData) => {
    const sanitizedData = JSON.parse(JSON.stringify(updatedData));
    await update(endpoint, sanitizedData);
  };

  const deleteMutation = async (id) => {
    await remove(endpoint, id);
  };

  return { fetchQuery, fetchRelatedData, createMutation, updateMutation, deleteMutation };
}