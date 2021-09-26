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
  }
  //cuando tiene la info del local imprime los jarrones
  jarrones.map(imprimirJarrones);
};

// imprime los jarrones en pantalla con las imagenes, los montos y porcentajes
const imprimirJarrones = (valor, indice) => {
  jarronesGastos.innerHTML += ` <div class="gastosPorJarron">
    <div class="gastosPorJarronTitulo">
    <img class="gastosPorJarronImg" src="img/j${indice}.png">
    <h3>${valor.nombre}</h3>
    
    </div>
    </div> `;
  imprimirGastosLocalStorage(valor.nombre);
};

const imprimirGastosLocalStorage = (nombreJarron) => {
  todoGasto = JSON.parse(localStorage.getItem("gastos"));
  if (todoGasto === null) {
    todoGasto = [];
  }
  imprimirGastos(nombreJarron);
};

const imprimirGastos = (nombreJarron) => {
  let htmlListaGasto = "";
  todoGasto.map((valor, indice) => {
    if (nombreJarron == jarrones[valor.jarron].nombre) {
      console.log("paso por el map");
      if (indice > 9) {
        return;
      }
      htmlListaGasto += `<ul class="list-group list-group-horizontal">
      <li class="list-group-item">${valor.fechaGasto}</li>
      <li class="list-group-item">${valor.descGasto}</li>
      <li class="list-group-item">$${valor.montoGasto}</li>
    </ul>`;
    }
  });
  jarronesGastos.innerHTML += htmlListaGasto;
};

jarronesLocalStorage();
