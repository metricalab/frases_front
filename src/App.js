import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FormFields from './components/FormFields';
import Refran from './components/Refran';
import NumRefran from './components/NumRefran';
import ListaRefranes from './components/ListaRefranes';
import Inicio from './components/Inicio';
import Fail from './components/Fail';

function App() {
  const [ordenamiento_ho, guardarOrdenamiento] = useState('');
  const [accion_ho, guardarAccion] = useState('');
  const [numeroRefranes_ho, guardarNumeroRefranes] = useState('');
  const [criterioBusqueda_ho, guardarCriterioBusqueda] = useState('');
  const [error_ho, guardarError] = useState(false);
  const [datosApi_ho, guardarDatosApi] = useState({});
  const [datosListaApi_ho, guardarDatosListaApi] = useState({});

  useEffect(() => {
    // prevenir ejecucion
    if (accion_ho === '') return;

    const consultarAPI = async () => {
      if (
        accion_ho === 'ACC2' &&
        (numeroRefranes_ho === '' ||
          ordenamiento_ho === '' ||
          isNaN(numeroRefranes_ho))
      ) {
        return null;
      }

      if (accion_ho === 'ACC5' && ordenamiento_ho === '') {
        return null;
      }

      if (
        accion_ho === 'ACC6' &&
        (criterioBusqueda_ho === '' || isNaN(criterioBusqueda_ho))
      ) {
        return null;
      }

      if (accion_ho === 'ACC7' && criterioBusqueda_ho === '') {
        return null;
      }

      let url = ``;
      const puerto = process.env.REACT_APP_PORT;
      const url_servicio = process.env.REACT_APP_URL;

      let puerto_var = `:${puerto}`;
      let contexto = 'metrica';
      if (puerto_var === ':1111') {
        puerto_var = '';
        contexto = 'metricasb';
      }

      switch (accion_ho) {
        case 'ACC1':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/mejor`;
          break;
        case 'ACC2':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/${numeroRefranes_ho}/${ordenamiento_ho}`;
          break;
        case 'ACC3':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/numeroTotal`;
          break;
        case 'ACC4':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/aleatorio`;
          break;
        case 'ACC5':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/ordenar/${ordenamiento_ho}`;
          break;
        case 'ACC6':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/${criterioBusqueda_ho}`;
          break;
        case 'ACC7':
          url = `${url_servicio}${puerto_var}/${contexto}/api/refranes/user/${criterioBusqueda_ho}`;
          break;
        default:
          console.log(
            'Lo lamentamos, por el momento no disponemos de la acción ' +
              accion_ho +
              '.'
          );
      }

      // Consultar la URL
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
    // Validaciones

    console.log('valor: ' + isNaN(datosFormulario.criterioBusqueda));

    if (
      datosFormulario.accion === 'ACC2' &&
      (datosFormulario.numeroRefranes === '' ||
        datosFormulario.ordenamiento === '')
    ) {
      guardarError(true);
    } else if (
      datosFormulario.accion === 'ACC2' &&
      isNaN(datosFormulario.numeroRefranes)
    ) {
      guardarError(true);
    } else if (
      datosFormulario.accion === 'ACC5' &&
      datosFormulario.ordenamiento === ''
    ) {
      guardarError(true);
    } else if (
      datosFormulario.accion === 'ACC6' &&
      (datosFormulario.criterioBusqueda === '' ||
        isNaN(datosFormulario.criterioBusqueda))
    ) {
      guardarError(true);
    } else if (
      datosFormulario.accion === 'ACC7' &&
      datosFormulario.criterioBusqueda === ''
    ) {
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
    <div className='App'>
      <Header titulo='Refranes' />

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

      <Footer />
    </div>
  );
}

export default App;
