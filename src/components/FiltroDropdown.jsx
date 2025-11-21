import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

/**
 * Filtro desplegable para seleccionar el tipo de medición a mostrar.
 * Utiliza Dropdown y Button de PrimeReact.
 * Opciones de filtro:
 * - Todos
 * - Kilowatts
 * - Watts
 * - Temperatura
*/

const opcionesFiltro = [
  { label: 'Todos', value: '' },
  { label: 'Kilowatts', value: 'kilowatts' },
  { label: 'Watts', value: 'watts' },
  { label: 'Temperatura', value: 'temperatura' },
];

function FiltroDropdown({ filtro, setFiltro, onFiltrar }) {
  return (
    <div style={{ margin: '1rem', maxWidth: '300px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <label htmlFor="filtro" style={{ minWidth: '50px' }}>Filtrar:</label>
      <Dropdown
        id="filtro"
        value={filtro} // filtro es el string: ''|'kilowatts'|'watts'|'temperatura'
        options={opcionesFiltro}
        optionLabel="label"
        onChange={(e) => {
          setFiltro(e.value);  
          console.log('Filtro cambiado a:', e.value, typeof e.value);
        }}
        className="p-dropdown"
        style={{ flexGrow: 1 }}
      />

      <Button label="Filtrar" onClick={onFiltrar} />
    </div>
  );
}

export default FiltroDropdown;
