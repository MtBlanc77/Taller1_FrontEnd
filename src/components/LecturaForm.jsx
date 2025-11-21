import React, { useState, useRef } from 'react';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import MedicionService from '../services/MedicionService';

const medidores = Array.from({ length: 10 }, (_, i) => ({
  label: `Medidor ${i + 1}`,
  value: i + 1
}));

const tiposMedida = [
  { name: 'Kilowatts', code: 'kilowatts' },
  { name: 'Watts', code: 'watts' },
  { name: 'Temperatura', code: 'temperatura' },
];

/**
 * Formulario para registrar una nueva lectura de medidor.
 * Valida los campos requeridos y, si todo es válido, guarda la medición
 * en localStorage y redirige a la página de "Mediciones".
*/

function LecturaForm() {
  const [fecha, setFecha] = useState(null);
  const [medidor, setMedidor] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [valor, setValor] = useState(null);
  const [tipoMedida, setTipoMedida] = useState(null);
  const toast = useRef(null);
  const navigate = useNavigate();

/**
 * Realiza la validación de los campos del formulario.
 * Si hay errores, muestra un único Toast con la lista de mensajes.
*/

  const validate = () => {
  const errores = [];

  if (!fecha) {
    errores.push('Debe seleccionar fecha y hora');
  }
  if (!medidor) {
    errores.push('Debe seleccionar un medidor');
  }
  if (!direccion || direccion.trim() === '') {
    errores.push('Debe ingresar la dirección');
  }
  if (valor === null || valor <= 0 || valor > 500) {
    errores.push('Valor debe ser entre 1 y 500');
  }
  if (!tipoMedida) {
    errores.push('Debe seleccionar un tipo de medida');
  }

  if (errores.length > 0) {
    toast.current.show({
      severity: 'warn',
      summary: 'Errores de validación',
      detail: (
        <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
          {errores.map((er, idx) => <li key={idx}>{er}</li>)}
        </ul>
      ),
      life: 4000
    });
    return false;
  }

  return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    MedicionService.add({
      fecha: fecha.toISOString(),
      medidor,
      direccion,
      valor,
      tipoMedida: tipoMedida.code,
    });

    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Medición registrada', life: 3000 });
    navigate('/mediciones');
  };

  return (
    <div style={{ margin: '2rem', maxWidth: '600px' }}>
      <Toast ref={toast} />
      <form onSubmit={handleSubmit}>
        <h3>Registrar nueva lectura</h3>

        <label htmlFor="fecha">Fecha y Hora</label>
        <Calendar
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.value)}
          showTime
          dateFormat="dd-mm-yy"
          hourFormat="24"
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="Selecciona fecha y hora"
        />

        <label htmlFor="medidor">Medidor</label>
        <Dropdown
          id="medidor"
          value={medidor}
          options={medidores}
          onChange={(e) => setMedidor(e.value)}
          placeholder="Selecciona un medidor"
          style={{ width: '100%', marginBottom: '1rem' }}
        />

        <label htmlFor="direccion">Dirección</label>
        <Editor
          id="direccion"
          value={direccion}
          onTextChange={(e) => setDireccion(e.htmlValue)}
          style={{ height: '120px', marginBottom: '1rem' }}
          placeholder="Ingrese dirección"
        />

        <label htmlFor="valor">Valor</label>
        <InputNumber
          id="valor"
          value={valor}
          onValueChange={(e) => setValor(e.value)}
          min={1}
          max={500}
          showButtons
          style={{ width: '100%', marginBottom: '1rem' }}
          placeholder="Ingrese valor (1 a 500)"
        />

        <label>Tipo de Medida</label>
        <div className="field-radiobutton" style={{ marginBottom: '1rem' }}>
          {tiposMedida.map((tipo) => (
            <div key={tipo.code} style={{ marginBottom: '0.5rem' }}>
              <RadioButton
                inputId={tipo.code}
                name="tipoMedida"
                value={tipo}
                onChange={(e) => setTipoMedida(e.value)}
                checked={tipoMedida?.code === tipo.code}
              />
              <label htmlFor={tipo.code} style={{ marginLeft: '0.5rem' }}>{tipo.name}</label>
            </div>
          ))}
        </div>

        <Button label="Registrar" type="submit" />
      </form>
    </div>
  );
}

export default LecturaForm;
