import { openDB } from 'idb';

const dbPromise = openDB('ps', 1, {
 upgrade(db) {
  db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true })
   .createIndex('name', 'name', { unique: false })
   .createIndex('description', 'description', { unique: false })
   .createIndex('created_at', 'created_at', { unique: false })
   .createIndex('updated_at', 'updated_at', { unique: false });

  db.createObjectStore('crossbars', { keyPath: 'id', autoIncrement: true })
   .createIndex('name', 'name', { unique: false })
   .createIndex('created_at', 'created_at', { unique: false })
   .createIndex('updated_at', 'updated_at', { unique: false });

  db.createObjectStore('products', { keyPath: 'id', autoIncrement: true })
   .createIndex('name', 'name', { unique: false })
   .createIndex('quantity', 'quantity', { unique: false })
   .createIndex('description', 'description', { unique: false })
   .createIndex('category_id', 'category_id', { unique: false })
   .createIndex('rack_id', 'rack_id', { unique: false })
   .createIndex('crossbar_id', 'crossbar_id', { unique: false })
   .createIndex('status_id', 'status_id', { unique: false })
   .createIndex('foto_product', 'foto_product', { unique: false })
   .createIndex('created_at', 'created_at', { unique: false })
   .createIndex('updated_at', 'updated_at', { unique: false });

  db.createObjectStore('racks', { keyPath: 'id', autoIncrement: true })
   .createIndex('name', 'name', { unique: false })
   .createIndex('created_at', 'created_at', { unique: false })
   .createIndex('updated_at', 'updated_at', { unique: false });

  db.createObjectStore('status', { keyPath: 'id', autoIncrement: true })
   .createIndex('name', 'name', { unique: false })
   .createIndex('created_at', 'created_at', { unique: false })
   .createIndex('updated_at', 'updated_at', { unique: false });
 },
});

export const getAll = async (storeName) => {
 const db = await dbPromise;
 return db.getAll(storeName);
};

export const getById = async (storeName, id) => {
 const db = await dbPromise;
 return db.get(storeName, id);
};

export const add = async (storeName, value) => {
 const db = await dbPromise;
 return db.add(storeName, value);
};

export const update = async (storeName, value) => {
 const db = await dbPromise;
 return db.put(storeName, value);
};

export const remove = async (storeName, id) => {
 const db = await dbPromise;
 return db.delete(storeName, id);
};