import React from 'react';

const refran = ({ resultado, accion }) => {
  let tamanoRefran;
  if (accion === 'ACC2' || accion === 'ACC5') {
    tamanoRefran = 'refran-peque';
  } else {
    console.log(resultado);
    console.log(accion);
    tamanoRefran = 'refran-grande';
  }

  return (
    <React.Fragment>
      <div className='card-panel white cols s12'>
        <div className='back-text'>
          <blockquote>
            <p className={tamanoRefran}>{resultado.texto}</p>
          </blockquote>
        </div>
      </div>
    </React.Fragment>
  );
};

export default refran;
