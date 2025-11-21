// Clave utilizada para guardar las mediciones en localStorage
const STORAGE_KEY = 'mediciones';

/**
 * Servicio de acceso a las mediciones almacenadas en localStorage.
 * Centraliza las operaciones CRUD básicas.
*/
const MedicionService = {
  
/**
   * Retorna todas las mediciones almacenadas.
*/

  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

/**
   * Agrega una nueva medición y le asigna un id incremental.
*/

  add: (medicion) => {
    const mediciones = MedicionService.getAll();
    // Asignar id incremental simple
    const nuevoId = mediciones.length > 0 ? mediciones[mediciones.length - 1].id + 1 : 1; 
    const nuevaMedicion = { id: nuevoId, ...medicion };
    mediciones.push(nuevaMedicion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mediciones));
  },

/**
 * Elimina la medición con el id indicado.
*/
  remove: (id) => {
    const mediciones = MedicionService.getAll();
    const filtradas = mediciones.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
  },

/**
   * Elimina todas las mediciones del almacenamiento.
*/
  
clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default MedicionService;
