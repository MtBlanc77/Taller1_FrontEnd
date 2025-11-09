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

function LecturaForm() {
  const [fecha, setFecha] = useState(null);
  const [medidor, setMedidor] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [valor, setValor] = useState(null);
  const [tipoMedida, setTipoMedida] = useState(null);
  const toast = useRef(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!fecha) {
      toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Debe seleccionar fecha y hora', life: 3000 });
      return false;
    }
    if (!medidor) {
      toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Debe seleccionar un medidor', life: 3000 });
      return false;
    }
    if (!direccion || direccion.trim() === '') {
      toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Debe ingresar la dirección', life: 3000 });
      return false;
    }
    if (valor === null || valor <= 0 || valor > 500) {
      toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Valor debe ser entre 1 y 500', life: 3000 });
      return false;
    }
    if (!tipoMedida) {
      toast.current.show({ severity: 'warn', summary: 'Error', detail: 'Debe seleccionar un tipo de medida', life: 3000 });
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
