import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FiltroDropdown from '../components/FiltroDropdown';
import MedicionesTable from '../components/MedicionesTable';
import MedicionService from '../services/MedicionService';

/**
 * Página "Mediciones".
 * - Carga todas las mediciones desde el servicio.
 * - Permite filtrarlas por tipo de medida usando FiltroDropdown.
 * - Muestra los datos en MedicionesTable.
*/

function Mediciones() {
  const [filtro, setFiltro] = useState('');
  const [mediciones, setMediciones] = useState([]);

  useEffect(() => {
    setMediciones(MedicionService.getAll());
  }, []);

  const filtrarMediciones = () => {
  console.log('Filtrando con filtro:', filtro, typeof filtro);
  const filtroReal = typeof filtro === 'object' ? filtro.value : filtro;
  const todas = MedicionService.getAll();
  if (filtroReal === '' || filtroReal === null || filtroReal === undefined) {
    setMediciones(todas);
  } else {
    const filtradas = todas.filter(med => med.tipoMedida === filtroReal);
    setMediciones(filtradas);
  }
};

  return (
    <>
      <Navbar />
      <FiltroDropdown filtro={filtro} setFiltro={setFiltro} onFiltrar={filtrarMediciones} />
      <MedicionesTable mediciones={mediciones} setMediciones={setMediciones} />
    </>
  );
}

export default Mediciones;
