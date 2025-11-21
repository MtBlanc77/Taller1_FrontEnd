import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link } from 'react-router-dom';
import '../index.scss';

/**
 * Barra de navegación principal de la aplicación.
 * Utiliza Menubar de PrimeReact y React Router para navegar entre:
 * - Home
 * - Registrar Lectura
 * - Ver Mediciones
*/

function Navbar() {
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      template: (item) => (
        <Link to="/" className="p-menuitem-link">
          <span className="p-menuitem-icon pi pi-fw pi-home"></span>
          <span className="p-menuitem-text">{item.label}</span>
        </Link>
      )
    },
    {
      label: 'Registrar Lectura',
      icon: 'pi pi-fw pi-plus',
      template: (item) => (
        <Link to="/registrar" className="p-menuitem-link">
          <span className="p-menuitem-icon pi pi-fw pi-plus"></span>
          <span className="p-menuitem-text">{item.label}</span>
        </Link>
      )
    },
    {
      label: 'Ver Mediciones',
      icon: 'pi pi-fw pi-list',
      template: (item) => (
        <Link to="/mediciones" className="p-menuitem-link">
          <span className="p-menuitem-icon pi pi-fw pi-list"></span>
          <span className="p-menuitem-text">{item.label}</span>
        </Link>
      )
    }
  ];

  const start = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '0.75rem' }}>
      <i className="pi pi-lightbulb" style={{ color: 'yellow', fontSize: '1.8rem' }}></i>
      <span style={{ fontWeight: '700', fontSize: '1.3rem', color: '#000' }}>SanQuinta</span>
    </div>
  );

return (
  <Menubar
    className="my-menubar"
    model={items}
    start={start}
  />
);

}

export default Navbar;
