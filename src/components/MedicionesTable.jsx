import React, { useRef }from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import MedicionService from '../services/MedicionService';

/**
 * Tabla de mediciones registradas.
 * - Muetra las lecturas almacenadas en localStorage.
 * - Permite eliminar una medición y muestra un toast de confirmación.
*/

function MedicionesTable({ mediciones, setMediciones }) {
  const toast = useRef(null);

  const handleEliminar = (id) => {
    MedicionService.remove(id);
    setMediciones(MedicionService.getAll());
    
    toast.current?.show({
      severity: 'info',
      summary: 'Medición eliminada',
      detail: 'La lectura fue descartada correctamente.',
      life: 3000
    });
  };

  const bodyValor = (rowData) => {
    let unidad = '';
    switch (rowData.tipoMedida) {
      case 'kilowatts': unidad = 'kW'; break;
      case 'watts': unidad = 'W'; break;
      case 'temperatura': unidad = '°C'; break;
      default: unidad = '';
    }
    return `${rowData.valor} ${unidad}`;
  };

  const bodyDireccion = (rowData) => {
    return <div dangerouslySetInnerHTML={{ __html: rowData.direccion }} />;
  };

  const bodyAcciones = (rowData) => {
    return (
      <Button
        label="Eliminar"
        icon="pi pi-trash"
        className="p-button-danger"
        onClick={() => handleEliminar(rowData.id)}
      />
    );
  };

  const fechaBody = (rowData) => {
    const d = new Date(rowData.fecha);
    return d.toLocaleDateString();  
  };

  const horaBody = (rowData) => {
    const d = new Date(rowData.fecha);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ margin: '2rem' }}>
      <Toast ref={toast} />

      <DataTable
        value={mediciones}
        paginator
        rows={10}
        emptyMessage="No hay mediciones registradas"
        sortMode="single"
        sortField="fecha"
        sortOrder={-1}
      >
        <Column field="id" header="ID" style={{ width: '5rem' }} />
        <Column field="fecha" header="Fecha" body={fechaBody} sortable />
        <Column header="Hora" body={horaBody} />
        <Column field="medidor" header="Medidor" />
        <Column field="direccion" header="Dirección" body={bodyDireccion} />
        <Column field="valor" header="Valor" body={bodyValor} />
        <Column field="tipoMedida" header="Tipo" />
        <Column 
        header="Acciones" body={bodyAcciones} style={{ width: '10rem', textAlign: 'center' }} />
      </DataTable>

    </div>
  );
}

export default MedicionesTable;
