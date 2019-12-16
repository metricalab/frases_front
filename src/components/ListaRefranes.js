import React from 'react';
import Refran from './Refran';

const ListaRefranes = ({ resultado, accion }) => {
  console.log(Object.keys(resultado).length < 0);
  console.log(accion);

  if (Object.keys(resultado).length === 0) return null;

  let listaRefranes = resultado;
  console.log(listaRefranes);
  return (
    <React.Fragment>
      <div className='card-panel white cols s12'>
        <div className='back-text'>
          <p>Lista de refranes </p>
          {resultado.map(refran => (
            <Refran key={refran.id} resultado={refran} accion={accion} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ListaRefranes;
