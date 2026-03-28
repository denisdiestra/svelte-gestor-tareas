<script>
  import { tareasStore } from './store.js';

  export let tarea;

  function eliminar() {
    tareasStore.update(tareas => tareas.filter(t => t.id !== tarea.id));
  }

  // NUEVO: Función para cambiar el estado de completado en la Store
  function toggleCompletada() {
    tareasStore.update(tareas => {
      // Mapeamos las tareas. Si es la que clickeamos, invertimos su estado.
      return tareas.map(t => 
        t.id === tarea.id ? { ...t, completada: !t.completada } : t
      );
    });
  }
</script>

<li class={tarea.completada ? 'completada' : ''}>
  <input 
    type="checkbox" 
    checked={tarea.completada} 
    on:change={toggleCompletada} 
  />
  <span>{tarea.texto}</span>
  <button on:click={eliminar}>❌</button>
</li>

<style>
  li { display: flex; align-items: center; gap: 10px; padding: 10px; background: #222; margin-bottom: 8px; border-radius: 4px; border: 1px solid #444; }
  .completada span { text-decoration: line-through; color: #666; }
  button { cursor: pointer; background: transparent; border: none; }
</style>