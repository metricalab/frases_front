import React, { useState, useEffect } from 'react';
import FormFields from './FormFields';
import Refran from './Refran';
import NumRefran from './NumRefran';
import ListaRefranes from './ListaRefranes';
import Inicio from './Inicio';
import Fail from './Fail';
import BodyUtils from './BodyUtils';

function Body() {
  const [ordenamiento_ho, guardarOrdenamiento] = useState('');
  const [accion_ho, guardarAccion] = useState('');
  const [numeroRefranes_ho, guardarNumeroRefranes] = useState('');
  const [criterioBusqueda_ho, guardarCriterioBusqueda] = useState('');
  const [error_ho, guardarError] = useState(false);
  const [datosApi_ho, guardarDatosApi] = useState({});
  const [datosListaApi_ho, guardarDatosListaApi] = useState({});

  useEffect(() => {
    const consultarAPI = async () => {
      // Prevenir la ejecucion si no están todos los datos necesarios
      if (
        BodyUtils.preventUrlCall(
          numeroRefranes_ho,
          accion_ho,
          ordenamiento_ho,
          criterioBusqueda_ho
        )
      ) {
        return null;
      }

      // Contruir la llamada al backend
      let url = BodyUtils.buildUrlCall(
        accion_ho,
        numeroRefranes_ho,
        ordenamiento_ho,
        criterioBusqueda_ho
      );

      // Realizar la llamada
      console.log(url);
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      if (
        accion_ho === 'ACC2' ||
        accion_ho === 'ACC5' ||
        accion_ho === 'ACC7'
      ) {
        guardarDatosListaApi(resultado);
      } else {
        guardarDatosApi(resultado);
      }
    };

    consultarAPI();
  }, [ordenamiento_ho, accion_ho, numeroRefranes_ho, criterioBusqueda_ho]);

  const peticionDatosF = datosFormulario => {
    console.log('valor: ' + isNaN(datosFormulario.criterioBusqueda));

    // Realizar las validaciones del formulario
    if (BodyUtils.checkFormError(datosFormulario)) {
      guardarError(true);
    } else {
      guardarError(false);
    }

    guardarOrdenamiento(datosFormulario.ordenamiento);
    guardarAccion(datosFormulario.accion);
    guardarNumeroRefranes(datosFormulario.numeroRefranes);
    guardarCriterioBusqueda(datosFormulario.criterioBusqueda);
  };

  // Cargar un componente condicionalmente
  let componente;
  if (error_ho) {
    let messageErr = 'Error';
    if (accion_ho === 'ACC2') {
      messageErr = isNaN(numeroRefranes_ho)
        ? 'Refranes debe ser un número'
        : 'Refranes y Orden son campos obligatorios para realizar esta consulta';
      componente = <Fail mensaje={messageErr} />;
    } else if (accion_ho === 'ACC5') {
      componente = (
        <Fail mensaje='Orden es un campo obligatorio para realizar esta consulta' />
      );
    } else if (accion_ho === 'ACC6' || accion_ho === 'ACC7') {
      componente = <Fail mensaje='Falta el criterio de busqueda' />;
    }
  } else {
    if (accion_ho === 'ACC3') {
      componente = <NumRefran resultado={datosApi_ho} accion={accion_ho} />;
    } else if (
      accion_ho === 'ACC1' ||
      accion_ho === 'ACC4' ||
      accion_ho === 'ACC6'
    ) {
      componente = <Refran resultado={datosApi_ho} accion={accion_ho} />;
    } else if (
      accion_ho === 'ACC2' ||
      accion_ho === 'ACC5' ||
      accion_ho === 'ACC7'
    ) {
      componente = (
        <ListaRefranes resultado={datosListaApi_ho} accion={accion_ho} />
      ); // Lista de refranes
    } else {
      componente = <Inicio />;
    }
  }

  return (
    <div className='contenedor-form'>
      <div className='container'>
        <div className='row'>
          <div className='col s12 m5'>
            <FormFields peticionDatosF={peticionDatosF} />
          </div>
          <div className='col s12 m7'>{componente}</div>
        </div>
      </div>
    </div>
  );
}

export default Body;
