import React, { useState } from 'react';

const FormFields = ({ peticionDatosF }) => {
  const [datosFormulario, guardarDatosFormulario] = useState({
    ordenamiento: '',
    accion: '',
    numeroRefranes: ''
  });

  const cambioDetectado = e => {
    guardarDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const consultarRefranes = e => {
    e.preventDefault();
    peticionDatosF(datosFormulario); // Usando hooks pasamos los valores leidos
  };

  return (
    <form onSubmit={consultarRefranes}>
      <div className='input-field col s5'>
        <input
          type='text'
          name='numeroRefranes'
          id='numeroRefranes'
          placeholder='-Número refranes-'
          onChange={cambioDetectado}
        />
        <label htmlFor='numeroRefranes'>Refranes</label>
      </div>

      <div className='input-field col s7'>
        <select onChange={cambioDetectado} name='ordenamiento'>
          <option value=''>-Orden-</option>
          <option value='ASC'>ascendente</option>
          <option value='DESC'>descendente</option>
        </select>
        <label htmlFor='numeroRefranes'>Calidad</label>
      </div>

      <div className='input-field col s12'>
        <select onChange={cambioDetectado} name='accion'>
          <option value=''>-Selecciona una acción-</option>
          <option value='ACC1'>Mejor refrán</option>
          <option value='ACC2'>Obtener un número de refranes</option>
          <option value='ACC3'>Numero total de refranes</option>
          <option value='ACC4'>Refran aleatorio</option>
          <option value='ACC5'>Ordenar todos los refranes</option>
        </select>
        <label htmlFor='numeroRefranes'>Acciones</label>
      </div>

      <div className='input-field col s12'>
        <button
          className='waves-effect waves-light btn-large btn-block metrica-color2 accent-4'
          type='submit'
          name='actionButton'
        >
          Lanzar acción
          <i className='material-icons right'>send</i>
        </button>
      </div>
    </form>
  );
};

export default FormFields;
