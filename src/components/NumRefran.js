import React from 'react';

const numRefran = ({ resultado, accion }) => {
  console.log(resultado);
  console.log(accion);
  return (
    <React.Fragment>
      <div className='card-panel white cols s12'>
        <div className='back-text'>
          <p>Numero de refranes totales </p>
          <p className='refran-grande'>{resultado.numero}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default numRefran;
