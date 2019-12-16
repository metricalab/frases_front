import React from 'react';
import logo from './../logo.svg';

const Inicio = () => {
  return (
    <React.Fragment>
      <div className='card-panel black cols s12'>
        <div className='back-text center'>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
      </div>
      <div className='card-panel black cols s12'>
        <div className='white-text center'>
          Aplicación SPA React que comunica con el servicio Refranes
          (SpringBoot)
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inicio;
