import React from 'react';
import Refran from './Refran';

const ListaRefranes = ({ resultado, accion }) => {
  console.log(Object.keys(resultado).length < 0);
  console.log(accion);

  let componente = (
    <React.Fragment>
      <div className='card-panel white cols s12'>
        <div className='back-text'>
          <p>Lista de refranes </p>

          <p>No hay datos</p>
        </div>
      </div>
    </React.Fragment>
  );

  if (Object.keys(resultado).length > 0) {
    componente = (
      <React.Fragment>
        <div className='card-panel white cols s12'>
          <div className='back-text'>
            <p>Lista de refranes</p>

            {resultado.map(refran => (
              <Refran key={refran.id} resultado={refran} accion={accion} />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }

  return componente;
};

export default ListaRefranes;
