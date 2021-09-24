const imprimirIngresos = () => {
  let htmlListaIngreso = "";

  todoIngreso.map((valor) => {
    htmlListaIngreso += `<p class="alert alert-secondary" role="alert">Fecha : ${valor.fechaIngreso} Descripcion : ${valor.descIngreso}  Monto: $${valor.montoIngreso} `;
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
