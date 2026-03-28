import { writable } from 'svelte/store';

// 1. Leemos el LocalStorage al inicializar
const tareasIniciales = JSON.parse(localStorage.getItem('mis_tareas')) || [
  { id: 1, texto: 'Aprender Svelte Stores', completada: false },
  { id: 2, texto: 'Dominar el mundo', completada: false }
];

// 2. Creamos una Store "escribible" (writable)
export const tareasStore = writable(tareasIniciales);

// 3. Magia: Nos suscribimos a la Store. 
// Cada vez que cambie, se guarda automáticamente en LocalStorage.
tareasStore.subscribe(tareas => {
  localStorage.setItem('mis_tareas', JSON.stringify(tareas));
});