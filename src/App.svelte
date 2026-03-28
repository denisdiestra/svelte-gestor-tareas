<script>
  import Tarea from './Tarea.svelte';
  import { tareasStore } from './store.js'; // Importamos la Store

  let nuevaTarea = '';
  let filtro = 'todas';
  
  // Recalculamos usando el prefijo $ para leer el valor de la Store
  $: tareasFiltradas = $tareasStore.filter(t => {
    if (filtro === 'pendientes') return !t.completada;
    if (filtro === 'completadas') return t.completada;
    return true;
  });

  function agregarTarea() {
    if (nuevaTarea.trim() === '') return;
    
    // Usamos .update() para modificar la Store
    tareasStore.update(tareasActuales => [
      ...tareasActuales, 
      { id: Date.now(), texto: nuevaTarea, completada: false }
    ]);
    
    nuevaTarea = ''; 
  }
</script>

<main>
  <h1>Mis Tareas en Svelte</h1>
  
  <div class="input-group">
    <input type="text" bind:value={nuevaTarea} placeholder="Escribe una nueva tarea..." on:keydown={(e) => e.key === 'Enter' && agregarTarea()} />
    <button on:click={agregarTarea}>Agregar</button>
  </div>

  <div class="filtros">
    <button class={filtro === 'todas' ? 'activo' : ''} on:click={() => filtro = 'todas'}>Todas</button>
    <button class={filtro === 'pendientes' ? 'activo' : ''} on:click={() => filtro = 'pendientes'}>Pendientes</button>
    <button class={filtro === 'completadas' ? 'activo' : ''} on:click={() => filtro = 'completadas'}>Completadas</button>
  </div>

  <ul>
    {#each tareasFiltradas as tarea (tarea.id)}
      <Tarea tarea={tarea} />
    {:else}
      <p style="text-align: center; color: #888;">No hay tareas en esta categoría.</p>
    {/each}
  </ul>
</main>

<style>
  /* Los mismos estilos de App.svelte... */
  main { max-width: 500px; margin: 0 auto; font-family: sans-serif; }
  .input-group { display: flex; gap: 10px; margin-bottom: 20px; }
  input[type="text"] { flex: 1; padding: 8px; background: #333; color: white; border: 1px solid #555; border-radius: 4px; }
  .filtros { display: flex; gap: 10px; margin-bottom: 20px; justify-content: center; }
  .filtros button { background: transparent; border: 1px solid #555; color: #ccc; padding: 5px 15px; border-radius: 20px; cursor: pointer; }
  .filtros button.activo { background: #646cff; color: white; border-color: #646cff; }
  ul { list-style: none; padding: 0; }
  h1 {
    color: #ff3e00; /* Naranja oficial de Svelte */
    text-align: center;
  }
</style>