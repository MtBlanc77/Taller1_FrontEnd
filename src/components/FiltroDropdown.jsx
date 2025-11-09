import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

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
          setFiltro(e.value);  // SIEMPRE e.value debe ser string o ''
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
