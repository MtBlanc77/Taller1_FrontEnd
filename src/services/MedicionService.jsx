const STORAGE_KEY = 'mediciones';

const MedicionService = {
  getAll: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  add: (medicion) => {
    const mediciones = MedicionService.getAll();
    // Asignar id incremental simple
    const nuevoId = mediciones.length > 0 ? mediciones[mediciones.length - 1].id + 1 : 1; 
    const nuevaMedicion = { id: nuevoId, ...medicion };
    mediciones.push(nuevaMedicion);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mediciones));
  },

  remove: (id) => {
    const mediciones = MedicionService.getAll();
    const filtradas = mediciones.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

export default MedicionService;
