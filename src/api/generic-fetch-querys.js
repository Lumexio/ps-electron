import { getAll, add, update, remove } from './indexeddb';

export function useGenericFetchQueries(endpoint) {
  const fetchQuery = async () => {
    return await getAll(endpoint);
  };

  const createMutation = async (newData) => {
    console.log(endpoint, newData);

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

  return { fetchQuery, createMutation, updateMutation, deleteMutation };
}