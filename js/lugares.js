lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

  // Completa las direcciones ingresadas por el usuario a y establece los límites
  // con un círculo cuyo radio es de 20000 metros.
  function autocompletar() {
    /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
    página (las direcciones ingresables por el usuario).
    Para esto creá un círculo con radio de 20000 metros y usalo para fijar
    los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
    var inputDireccion = document.getElementById('direccion');
    var inputAgregarDireccion = document.getElementById('agregar');
    var inputDesde = document.getElementById('desde');
    var inputHasta = document.getElementById('hasta');

    var circuloRadio = new google.maps.Circle({
      center: posicionCentral,
      radius: 20000
    });
    var servicioAutocompletar = new google.maps.places.Autocomplete(inputDireccion)
    servicioAutocompletar.setBounds(circuloRadio.getBounds());
    var servicioAutocompletarAgregar = new google.maps.places.Autocomplete(inputAgregarDireccion);
    servicioAutocompletarAgregar.setBounds(circuloRadio.getBounds());
    var servicioAutocompletarDesde = new google.maps.places.Autocomplete(inputDesde);
    servicioAutocompletarDesde.setBounds(circuloRadio.getBounds());
    var servicioAutocompletarHasta = new google.maps.places.Autocomplete(inputHasta);
    servicioAutocompletarHasta.setBounds(circuloRadio.getBounds());

    // servicioLugares.Autocomplete(inputDireccion)


  }

  // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar() {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

  // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca(posicion) {
    /* Completar la función buscarCerca  que realice la búsqueda de los lugares
del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
pasado como parámetro y llame a la función marcarLugares. */
    // console.log(posicion)
    var tipoDeLugar = document.getElementById('tipoDeLugar').value;
    var radio = document.getElementById('radio').value;
    var request = {
      'location': posicion,
      'radius': radio,
      'type': tipoDeLugar
    };
    servicioLugares.nearbySearch(request, function (results, status) {
      if (status == 'OK') {
        marcadorModulo.marcarLugares(results, status);

      } else {
        alert('Paso lo siguiente: ' + status)
      }
    })




  }

  return {
    inicializar,
    buscarCerca
  }
})()
