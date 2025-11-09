import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import MedicionService from '../services/MedicionService';

function MedicionesTable({ mediciones, setMediciones }) {

  const handleEliminar = (id) => {
    MedicionService.remove(id);
    // Actualizar lista en el padre
    setMediciones(MedicionService.getAll());
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

  const dateBodyTemplate = (rowData) => {
    return new Date(rowData.fecha).toLocaleString();
  };

  return (
    <div style={{ margin: '2rem' }}>
      <DataTable
        value={mediciones}
        paginator
        rows={10}
        emptyMessage="No hay mediciones registradas"
        sortMode="single"
        sortField="fecha"
        sortOrder={-1} // descendente
      >
        <Column field="id" header="ID" style={{ width: '5rem' }} />
        <Column field="fecha" header="Fecha" body={dateBodyTemplate} sortable />
        <Column field="medidor" header="Medidor" />
        <Column field="direccion" header="Dirección" body={bodyDireccion} />
        <Column field="valor" header="Valor" body={bodyValor} />
        <Column field="tipoMedida" header="Tipo" />
        <Column header="Acciones" body={bodyAcciones} style={{ width: '10rem', textAlign: 'center' }} />
      </DataTable>
    </div>
  );
}

export default MedicionesTable;
