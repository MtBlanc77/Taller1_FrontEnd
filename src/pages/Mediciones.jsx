import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FiltroDropdown from '../components/FiltroDropdown';
import MedicionesTable from '../components/MedicionesTable';
import MedicionService from '../services/MedicionService';

function Mediciones() {
  const [filtro, setFiltro] = useState('');
  const [mediciones, setMediciones] = useState([]);

  // Este efecto carga inicialmente todas las mediciones
  useEffect(() => {
    setMediciones(MedicionService.getAll());
  }, []);

  const filtrarMediciones = () => {
  console.log('Filtrando con filtro:', filtro, typeof filtro);
  // Si filtro es un objeto, usar filtro.value
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
