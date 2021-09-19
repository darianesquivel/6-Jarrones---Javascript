const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    imprimirDolar(data);
  })
  .catch((err) => console.log(err));

function imprimirDolar(data) {
  const valorDolar = document.querySelector("#dolar");

  valorDolar.innerHTML = `<p class='paraDolar'> DOLAR</p>`;
  valorDolar.innerHTML += `<p class='paraDolar'>COMPRA : ${data[0].casa.compra} / VENTA : ${data[0].casa.venta}</p>`;
}

const alertError = (valor) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${valor}`,
  });
};

const alertSucc = (valor) => {
  Swal.fire({
    icon: "success",
    title: `${valor}`,
    showConfirmButton: false,
    timer: 1500,
  });
};

const guardarIngreso = (e) => {
  e.preventDefault(); // hace que no se refresque la pagina cada vez que apretamos el submit del formulario
  let fechaIngreso = document.querySelector("#fechaIngreso").value;
  let montoIngreso = Number(document.querySelector("#montoIngreso").value);
  let descIngreso = document.querySelector("#descripcionIngreso").value;
  if (montoIngreso > 0) {
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

const guardarGasto = (e) => {
  e.preventDefault(); // hace que no se refresque la pagina cada vez que apretamos el submit del formulario
  let fechaGasto = document.querySelector("#fechaGasto").value;
  let montoGasto = Number(document.querySelector("#montoGasto").value);
  let descGasto = document.querySelector("#descripcionGasto").value;
  let jarron = document.querySelector("#jarron").value;
  if (montoGasto <= jarrones[jarron].valorTotalDisponible && montoGasto > 0) {
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

const cargarPagina = () => {
  jarronesLocalStorage();
  jarrones.map(imprimirOption);
  jarrones.map(imprimirJarrones);
  imprimirIngresoLocalStorage();
  imprimirGastosLocalStorage();
};

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

const jarronesLocalStorage = () => {
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
};

const ingresosLocalStorage = () =>
  localStorage.setItem("ingresos", JSON.stringify(todoIngreso));

const gastosLocalStorage = () =>
  localStorage.setItem("gastos", JSON.stringify(todoGasto));

const imprimirIngresoLocalStorage = () => {
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
};

const imprimirGastosLocalStorage = () => {
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
};

const imprimirOption = (valor, indice) =>
  (jarron.innerHTML += `<option value="${indice}"> ${valor.nombre} </option>`);

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

const imprimirIngresos = () => {
  let htmlListaIngreso = "";
  todoIngreso.map((valor, indice) => {
    if (indice > 9) {
      return;
    }
    htmlListaIngreso += `<p class="alert alert-success" role="alert">Fecha : ${valor.fechaIngreso} Descripcion : ${valor.descIngreso}  Monto: $${valor.montoIngreso} `;
  });
  listaIngreso.innerHTML = htmlListaIngreso;
};

const imprimirGastos = () => {
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
};

$("#agregarIngreso").on("click", function () {
  $(".ingreso").slideDown(100);
  $("#paraGastos")
    .slideUp(100)
    .siblings("#paraIngresos")
    .delay(100)
    .slideToggle(500);
});

$("#agregarGasto").on("click", function () {
  $(".ingreso").slideDown(100);
  $("#paraIngresos")
    .slideUp(100)
    .siblings("#paraGastos")
    .delay(100)
    .slideToggle(500);
});

$("#verJarrones").on("click", function () {
  $(".ingreso").slideUp(100);
  $("#contenedorJarrones").slideToggle(1000);
});

$("#verIngresos").on("click", function () {
  $("#paraListas").slideToggle(1000);
});

//eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2MDg2MTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJkYXJpYW5lc3F1aXZlbGZAZ21haWwuY29tIn0.ImBOy3votnt1X9_n4qEROS2Hf5Xuw1-bhVBKDc1mY3Ru4Z7GGOnOSa5uowoaiPH_Qdh-69SkJBT5bmjZdNcghQ

//Authorization: BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM2MDg2MTMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJkYXJpYW5lc3F1aXZlbGZAZ21haWwuY29tIn0.ImBOy3votnt1X9_n4qEROS2Hf5Xuw1-bhVBKDc1mY3Ru4Z7GGOnOSa5uowoaiPH_Qdh-69SkJBT5bmjZdNcghQ
