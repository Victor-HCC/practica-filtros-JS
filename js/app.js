//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//Generar un objeto con la busqueda
const datosbusqueda = {
  marca: '',
  year: '',
  minimo: '',
  maximo: '',
  puertas: '',
  transmision: '',
  color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos); //Muestra los autos al cargar

  //Llena las opciones de año
  llenarSelect();

})

//Event listener para los select de búsqueda
marca.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto()
});
year.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto();
});
minimo.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto();
});
maximo.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto();
});
puertas.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto();
});
transmision.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto();
});
color.addEventListener('change', (e) => {
  asignarValor(e);
  filtrarAuto();
});


//Funciones
function mostrarAutos(autos) {

  limpiarHTML(); //Elimina el HTML previo

  autos.forEach( auto => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement('P');

    autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmisión: ${transmision} - Precio: $${precio} - Color: ${color}
    `;

    //insertar en el html
    resultado.appendChild(autoHTML)
  })
}

//Limpiar HTML
function limpiarHTML() {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Genera los años del select
const llenarSelect = () => {
  for(let i = max; i >= min; i--) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);  //agrega las opaciones de año al select
  }
}

//Asignar valor a una propiedad del objeto busqueda
function asignarValor(e) {
  datosbusqueda[e.target.id] = e.target.value;
}

//Función que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

  if(resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();

  const noResultado = document.createElement('DIV');
  noResultado.classList.add('alerta', 'error');
  noResultado.textContent = 'No hay resultados';
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosbusqueda;
  if(marca) {
    return auto.marca === marca;
  }

  return auto;
}

function filtrarYear(auto) {
  const { year } = datosbusqueda;
  if(year) {
    return auto.year === parseInt(year);
  }

  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosbusqueda;
  if(minimo) {
    return auto.precio >= parseInt(minimo);
  }

  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosbusqueda;
  if(maximo) {
    return auto.precio <= parseInt(maximo);
  }

  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosbusqueda;
  if(puertas) {
    return auto.puertas === parseInt(puertas);
  }

  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosbusqueda;
  if(transmision) {
    return auto.transmision === transmision;
  }

  return auto;
}

function filtrarColor(auto) {
  const { color } = datosbusqueda;
  if(color) {
    return auto.color === color;
  }

  return auto;
}