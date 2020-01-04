const bodyUtils = {
  checkFormError: function(datosFormulario) {
    if (
      datosFormulario.accion === 'ACC2' &&
      (datosFormulario.numeroRefranes === '' ||
        datosFormulario.ordenamiento === '')
    ) {
      return true;
    } else if (
      datosFormulario.accion === 'ACC2' &&
      isNaN(datosFormulario.numeroRefranes)
    ) {
      return true;
    } else if (
      datosFormulario.accion === 'ACC5' &&
      datosFormulario.ordenamiento === ''
    ) {
      return true;
    } else if (
      datosFormulario.accion === 'ACC6' &&
      (datosFormulario.criterioBusqueda === '' ||
        isNaN(datosFormulario.criterioBusqueda))
    ) {
      return true;
    } else if (
      datosFormulario.accion === 'ACC7' &&
      datosFormulario.criterioBusqueda === ''
    ) {
      return true;
    } else {
      return false;
    }
  },
  buildUrlCall: function(
    accion_ho,
    numeroRefranes_ho,
    ordenamiento_ho,
    criterioBusqueda_ho
  ) {
    console.log(' Estoy hecho un hacker');
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
    return url;
  },
  preventUrlCall: function(
    numeroRefranes_ho,
    accion_ho,
    ordenamiento_ho,
    criterioBusqueda_ho
  ) {
    // prevenir ejecucion
    if (accion_ho === '') return true;

    if (
      accion_ho === 'ACC2' &&
      (numeroRefranes_ho === '' ||
        ordenamiento_ho === '' ||
        isNaN(numeroRefranes_ho))
    ) {
      return true;
    }

    if (accion_ho === 'ACC5' && ordenamiento_ho === '') {
      return true;
    }

    if (
      accion_ho === 'ACC6' &&
      (criterioBusqueda_ho === '' || isNaN(criterioBusqueda_ho))
    ) {
      return true;
    }

    if (accion_ho === 'ACC7' && criterioBusqueda_ho === '') {
      return true;
    }
    return false;
  }
};

export default bodyUtils;
