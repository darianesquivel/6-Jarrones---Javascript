//para implementar api y traer el valor del dolar.

async function fetchImprimir() {
  imprimirDolar(null);
  const dato = await precioDolar();
  imprimirDolar(dato);
}

async function precioDolar() {
  const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
  const dolar = await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data[0].casa;
    })
    .catch((err) => console.log(err));

  return dolar;
}

const imprimirDolar = (data = null) => {
  const valorDolar = document.querySelector("#dolar");
  valorDolar.innerHTML = `<p class='paraDolar'> ${
    data ? data.nombre : "Cargando..."
  }</p>`;
  valorDolar.innerHTML += `<p class='paraDolar'>COMPRA : ${
    data ? data.compra : "Cargando..."
  } / VENTA : ${data ? data.venta : "Cargando..."}</p>`;
};

// para las alertas de error
const alertError = (valor) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${valor}`,
  });
};

// para lar alertas success
const alertSucc = (valor) => {
  Swal.fire({
    icon: "success",
    title: `${valor}`,
    showConfirmButton: false,
    timer: 1500,
  });
};

// funcion guardarIngreso, tiene todas las validaciones para ingresar un ingreso, y repartirlo en los distintos jarrones segun su porcentaje
const guardarIngreso = (e) => {
  e.preventDefault(); // hace que no se refresque la pagina cada vez que apretamos el submit del formulario
  let fechaIngreso = document.querySelector("#fechaIngreso").value;
  let montoIngreso = Number(document.querySelector("#montoIngreso").value);
  let descIngreso = document.querySelector("#descripcionIngreso").value;

  //validaciones para que no deje vacio los campos
  if (fechaIngreso == "") {
    alertError('"Tiene que ingresar una fecha"');
  } else if (montoIngreso == "") {
    alertError("Tiene que ingresar un monto");
  } else if (descIngreso == "") {
    alertError("Tiene que ingresar una descripcion");
  } else if (montoIngreso > 0) {
    todoIngreso.unshift({ fechaIngreso, montoIngreso, descIngreso });
    jarrones.map((valor, indice) => {
      valor.valorTotalDisponible =
        valor.valorTotalDisponible + (montoIngreso / 100) * valor.porcentaje;
      localStorage.setItem("jarrones", JSON.stringify(jarrones));
      let idvalor = document.querySelector(`#valor${indice}`);
      idvalor.innerHTML = `$ ${valor.valorTotalDisponible.toFixed(2)}`;
    });
    0;
    alertSucc("Ingreso guardado");
    ingresosLocalStorage();
    imprimirIngresos();
  } else {
    alertError("Tu ingreso debe ser mayor a $0");
  }
};

// funcion guardarGastos, tiene todas las validaciones para ingresar un gasto y descontarlo dentro del jarron que corresponda.
const guardarGasto = (e) => {
  e.preventDefault(); // hace que no se refresque la pagina cada vez que apretamos el submit del formulario
  let fechaGasto = document.querySelector("#fechaGasto").value;
  let montoGasto = Number(document.querySelector("#montoGasto").value);
  let descGasto = document.querySelector("#descripcionGasto").value;
  let jarron = document.querySelector("#jarron").value;

  //validaciones para que no deje vacio los campos
  if (fechaGasto == "") {
    alertError("Tiene que ingresar una fecha");
  } else if (montoGasto == "") {
    alertError("Tiene que ingresar un monto");
  } else if (descGasto == "") {
    alertError("Tiene que ingresar una descripcion");
  } else if (jarron == "") {
    alertError("Tiene que seleccionar un jarron");
  } else if (
    montoGasto <= jarrones[jarron].valorTotalDisponible &&
    montoGasto > 0
  ) {
    todoGasto.unshift({ fechaGasto, montoGasto, descGasto, jarron });
    jarrones[jarron].valorTotalDisponible =
      jarrones[jarron].valorTotalDisponible - montoGasto;
    localStorage.setItem("jarrones", JSON.stringify(jarrones));
    let idvalor = document.querySelector(`#valor${jarron}`);
    idvalor.innerHTML = `$ ${jarrones[jarron].valorTotalDisponible.toFixed(2)}`;
    alertSucc("Gasto guardado");
    gastosLocalStorage();
    imprimirGastos();
  } else if (montoGasto < 0) {
    alertError("Tu gasto tiene que ser mayor a $0");
  } else {
    alertError("Tus fondos son insuficientes");
  }
};

// Agrupa todas las funciones en 1 para cargarla despues con un load
const cargarPagina = () => {
  jarronesLocalStorage();
  imprimirIngresoLocalStorage();
  imprimirGastosLocalStorage();
  fetchImprimir();
};

document
  .querySelector("#formIngreso")
  .addEventListener("submit", guardarIngreso); // Detecta click boton de ingresos y ejecuta la funcion guardarIngreso

document.querySelector("#formGasto").addEventListener("submit", guardarGasto); // Detecta click boton de gastos y ejecuta la funcion guardarGasto

window.addEventListener("load", cargarPagina); // Cuando carga la pagina, ejecuta las funciones que agrupe anteriormente

let todoIngreso = []; // Array con ingresos y descripciones
let todoGasto = []; // Array con gastos y descripciones

//para traer la info de los jarrones
async function obtenerJarrones() {
  const jarrones = await fetch("js/jarrones.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  return jarrones;
}

// Carga el jarron con los datos del localStorage
const jarronesLocalStorage = async () => {
  jarrones = JSON.parse(localStorage.getItem("jarrones"));
  if (jarrones === null) {
    //Si no tiene nada lo crea
    jarrones = await obtenerJarrones();
    console.log(jarrones);
  }
  //cuando tiene la info del local imprime los jarrones
  jarrones.map(imprimirJarrones);
  jarrones.map(imprimirOption);
};

// para guardar ingresos en el localStorage
const ingresosLocalStorage = () =>
  localStorage.setItem("ingresos", JSON.stringify(todoIngreso));

// para guardar gastos en el localStorage
const gastosLocalStorage = () =>
  localStorage.setItem("gastos", JSON.stringify(todoGasto));

// trae los ingresos del local y los imprime en pantalla
const imprimirIngresoLocalStorage = () => {
  todoIngreso = JSON.parse(localStorage.getItem("ingresos"));
  if (todoIngreso === null) {
    todoIngreso = [];
  }
  imprimirIngresos();
};

const imprimirIngresos = () => {
  let htmlListaIngreso = "";
  todoIngreso.map((valor, indice) => {
    if (indice > 9) {
      return;
    }
    htmlListaIngreso += `<p class="alert alert-secondary" role="alert">Fecha : ${valor.fechaIngreso} Descripcion : ${valor.descIngreso}  Monto: $${valor.montoIngreso} `;
  });
  listaIngreso.innerHTML = htmlListaIngreso;
};

// trae los gastos del local y los imprime en pantalla
const imprimirGastosLocalStorage = () => {
  todoGasto = JSON.parse(localStorage.getItem("gastos"));
  if (todoGasto === null) {
    todoGasto = [];
  }
  imprimirGastos();
};

//para variar el color de la lista de los gastos.
const seleccionarColor = (a) => {
  switch (a) {
    case "Necesidades":
      return "alert alert-danger";
      break;
    case "Educacion":
      return "alert alert-success";
      break;
    case "Ahorro":
      return "alert alert-warning";
      break;
    case "Diversion":
      return "alert alert-primary";
      break;
    case "Inversion":
      return "alert alert-info";
      break;
    case "Dar":
      return "alert alert-light";
      break;
  }
};

const imprimirGastos = () => {
  let htmlListaGasto = "";
  todoGasto.map((valor, indice) => {
    let clase = seleccionarColor(jarrones[valor.jarron].nombre);
    if (indice > 9) {
      return;
    }
    htmlListaGasto += `<p  class="${clase}" role="alert"> Fecha : ${
      valor.fechaGasto
    } Descripcion : ${valor.descGasto}  Monto: $${valor.montoGasto}  Jarron: ${
      jarrones[valor.jarron].nombre
    }</p> `;
  });
  listaGasto.innerHTML = htmlListaGasto;
};

// para imprimir los distintos jarrones en las opciones de gasto
const imprimirOption = (valor, indice) =>
  (jarron.innerHTML += `<option value="${indice}"> ${valor.nombre} </option>`);

// imprime los jarrones en pantalla con las imagenes, los montos y porcentajes
const imprimirJarrones = (valor, indice) => {
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
};

// animaciones

$("#agregarIngreso").on("click", function () {
  $(".ingreso").show(100);
  $("#paraListas").hide(600);
  $("#paraGastos").hide(200).siblings("#paraIngresos").delay(200).toggle(500);
});

$("#agregarGasto").on("click", function () {
  $(".ingreso").show(100);
  $("#paraListas").hide(600);
  $("#paraIngresos").hide(200).siblings("#paraGastos").delay(200).toggle(500);
});

$("#verIngresos").on("click", function () {
  $(".ingreso").hide(300);
  $("#paraListas").toggle(600);
});
