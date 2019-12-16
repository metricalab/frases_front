import React from 'react';

const Fail = ({ mensaje }) => {
  return (
    <div className='card-panel red darken-4 error col s12'>
      <h5>{mensaje}</h5>
    </div>
  );
};

export default Fail;
