document
  .querySelector("#formIngreso")
  .addEventListener("submit", guardarIngreso); // Detecta click boton de ingresos y ejecuta la funcion guardarIngreso

document.querySelector("#formGasto").addEventListener("submit", guardarGasto); // Detecta click boton de gastos y ejecuta la funcion guardarGasto

window.addEventListener("load", cargarPagina); // Cuando carga la pagina, ejecuta las funciones imprimirOption y imprimirJarrones

let jarrones = [
  { nombre: "Necesidades", valorTotalDisponible: 0, porcentaje: 55 },
  { nombre: "Educacion", valorTotalDisponible: 0, porcentaje: 10 },
  { nombre: "Ahorro", valorTotalDisponible: 0, porcentaje: 10 },
  { nombre: "Diversion", valorTotalDisponible: 0, porcentaje: 10 },
  { nombre: "Inversion", valorTotalDisponible: 0, porcentaje: 10 },
  { nombre: "Dar", valorTotalDisponible: 0, porcentaje: 5 },
];

let todoIngreso = []; // Array con ingresos y descripciones
let todoGasto = []; // Array con gastos y descripciones

function cargarPagina() {
  jarronesLocalStorage();
  jarrones.map(imprimirOption);
  jarrones.map(imprimirJarrones);
  imprimirIngresoLocalStorage();
  imprimirGastosLocalStorage();
}

function jarronesLocalStorage() {
  jarrones = JSON.parse(localStorage.getItem("jarrones"));

  if (jarrones === null) {
    jarrones = [
      { nombre: "Necesidades", valorTotalDisponible: 0, porcentaje: 55 },
      { nombre: "Educacion", valorTotalDisponible: 0, porcentaje: 10 },
      { nombre: "Ahorro", valorTotalDisponible: 0, porcentaje: 10 },
      { nombre: "Diversion", valorTotalDisponible: 0, porcentaje: 10 },
      { nombre: "Inversion", valorTotalDisponible: 0, porcentaje: 10 },
      { nombre: "Dar", valorTotalDisponible: 0, porcentaje: 5 },
    ];
  }
}

function ingresosLocalStorage() {
  localStorage.setItem("ingresos", JSON.stringify(todoIngreso));
}

function gastosLocalStorage() {
  localStorage.setItem("gastos", JSON.stringify(todoGasto));
}

function imprimirIngresoLocalStorage() {
  let htmlListaIngreso = "";

  todoIngreso = JSON.parse(localStorage.getItem("ingresos"));

  if (todoIngreso === null) {
    todoIngreso = [];
  }

  todoIngreso.map((valor, indice) => {
    if (indice > 9) {
      return;
    }

    htmlListaIngreso += `<p class="alert alert-success" role="alert"> Fecha : ${valor.fechaIngreso} Descripcion : ${valor.descIngreso}  Monto: $${valor.montoIngreso} `;
  });

  listaIngreso.innerHTML = htmlListaIngreso;
}

function imprimirGastosLocalStorage() {
  let htmlListaGasto = "";

  todoGasto = JSON.parse(localStorage.getItem("gastos"));

  if (todoGasto === null) {
    todoGasto = [];
  }

  todoGasto.map((valor, indice) => {
    if (indice > 9) {
      return;
    }
    htmlListaGasto += `<p  class="alert alert-danger" role="alert"> Fecha : ${
      valor.fechaGasto
    } Descripcion : ${valor.descGasto}  Monto: $${valor.montoGasto}  Jarron: ${
      jarrones[valor.jarron].nombre
    }</p> `;
  });

  listaGasto.innerHTML = htmlListaGasto;
}

function imprimirOption(valor, indice) {
  jarron.innerHTML += `<option value="${indice}"> ${valor.nombre} </option>`;
}

function imprimirJarrones(valor, indice) {
  contenedorJarrones.innerHTML += ` <div class="contenedorJarron">
<div class="tituloJarron">
<img class="imgJarron" src="img/j${indice}.png">
  <h3>${valor.nombre}</h3>
  
</div>
<div class="montoJarron">
  <h3 id="valor${indice}">$${valor.valorTotalDisponible.toFixed(2)}</h3>
</div>
<div class="botonJarron">
  <div>
    <h3>${valor.porcentaje}%</h3>
  </div>
</div>
</div> `;
}

function guardarIngreso(e) {
  e.preventDefault(); // hace que no se refresque la pagina cada vez que apretamos el submit del formulario
  let fechaIngreso = document.querySelector("#fechaIngreso").value;
  let montoIngreso = Number(document.querySelector("#montoIngreso").value);
  let descIngreso = document.querySelector("#descripcionIngreso").value;

  todoIngreso.unshift({ fechaIngreso, montoIngreso, descIngreso });

  jarrones.map((valor, indice) => {
    valor.valorTotalDisponible =
      valor.valorTotalDisponible + (montoIngreso / 100) * valor.porcentaje;

    localStorage.setItem("jarrones", JSON.stringify(jarrones));

    let idvalor = document.querySelector(`#valor${indice}`);
    idvalor.innerHTML = `$ ${valor.valorTotalDisponible.toFixed(2)}`;
  });
  0;
  ingresosLocalStorage();
  imprimirIngresos();
}

function guardarGasto(e) {
  e.preventDefault(); // hace que no se refresque la pagina cada vez que apretamos el submit del formulario
  let fechaGasto = document.querySelector("#fechaGasto").value;
  let montoGasto = Number(document.querySelector("#montoGasto").value);
  let descGasto = document.querySelector("#descripcionGasto").value;
  let jarron = document.querySelector("#jarron").value;

  todoGasto.unshift({ fechaGasto, montoGasto, descGasto, jarron });

  jarrones[jarron].valorTotalDisponible =
    jarrones[jarron].valorTotalDisponible - montoGasto;

  localStorage.setItem("jarrones", JSON.stringify(jarrones));

  let idvalor = document.querySelector(`#valor${jarron}`);
  idvalor.innerHTML = `$ ${jarrones[jarron].valorTotalDisponible.toFixed(2)}`;

  gastosLocalStorage();
  imprimirGastos();
}

function imprimirIngresos() {
  let htmlListaIngreso = "";

  todoIngreso.map((valor, indice) => {
    if (indice > 9) {
      return;
    }

    htmlListaIngreso += `<p class="alert alert-success" role="alert">Fecha : ${valor.fechaIngreso} Descripcion : ${valor.descIngreso}  Monto: $${valor.montoIngreso} `;
  });

  listaIngreso.innerHTML = htmlListaIngreso;
}

function imprimirGastos() {
  let htmlListaGasto = "";
  todoGasto.map((valor, indice) => {
    if (indice > 9) {
      return;
    }
    htmlListaGasto += `<p  class="alert alert-danger" role="alert"> Fecha : ${
      valor.fechaGasto
    } Descripcion : ${valor.descGasto}  Monto: $${valor.montoGasto}  Jarron: ${
      jarrones[valor.jarron].nombre
    }</p> `;
  });

  listaGasto.innerHTML = htmlListaGasto;
}
