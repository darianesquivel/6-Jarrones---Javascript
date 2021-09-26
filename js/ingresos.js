const imprimirIngresos = () => {
  let htmlListaIngreso = "";

  todoIngreso.map((valor) => {
    htmlListaIngreso += `<ul class="list-group list-group-horizontal">
    <li class="list-group-item">${valor.fechaIngreso}</li>
    <li class="list-group-item">${valor.descIngreso}</li>
    <li class="list-group-item">$${valor.montoIngreso}</li>
  </ul>`;
  });
  seccionListaIngresos.innerHTML = htmlListaIngreso;
};

// trae los ingresos del local y los imprime en pantalla
const imprimirIngresoLocalStorage = () => {
  todoIngreso = JSON.parse(localStorage.getItem("ingresos"));
  if (todoIngreso === null) {
    seccionListaIngresos.innerHTML = `<p class="alert alert-secondary" role="alert"> NO REGISTRA INGRESOS`;
    return;
  }
  imprimirIngresos();
};

imprimirIngresoLocalStorage();
