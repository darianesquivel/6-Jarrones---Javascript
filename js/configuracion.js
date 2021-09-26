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

async function obtenerJarrones() {
  const jarrones = await fetch("js/jarrones.json")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));

  return jarrones;
}

const mostrarPorcentajes = async (e) => {
  //e.preventDefault();
  jarrones = JSON.parse(localStorage.getItem("jarrones"));
  if (jarrones === null) {
    //Si no tiene nada lo crea
    jarrones = await obtenerJarrones(); // obtengo datos de los jarrones
  }

  //le paso el valor al formulario de cada jarron para que los range se muestren en el lugar correcto.
  document.querySelector("#rangeNecesidades").value = jarrones[0].porcentaje;
  document.querySelector("#rangeEducacion").value = jarrones[1].porcentaje;
  document.querySelector("#rangeAhorro").value = jarrones[2].porcentaje;
  document.querySelector("#rangeDiversion").value = jarrones[3].porcentaje;
  document.querySelector("#rangeInversion").value = jarrones[4].porcentaje;
  document.querySelector("#rangeDar").value = jarrones[5].porcentaje;

  let rangoNecesidades = Number(
    document.querySelector("#rangeNecesidades").value
  );
  let rangoEducacion = Number(document.querySelector("#rangeEducacion").value);
  let rangoAhorro = Number(document.querySelector("#rangeAhorro").value);
  let rangoDiversion = Number(document.querySelector("#rangeDiversion").value);
  let rangoInversion = Number(document.querySelector("#rangeInversion").value);
  let rangoDar = Number(document.querySelector("#rangeDar").value);
  let porcentajeTotal =
    rangoNecesidades +
    rangoEducacion +
    rangoAhorro +
    rangoDiversion +
    rangoInversion +
    rangoDar;

  //muestra el porcentaje en pantalla al lado del range.
  mostrarPorcentajeTotal.innerHTML = `${porcentajeTotal} %`;
};

mostrarPorcentajes();

const tomarPorcentajes = () => {
  let rangoNecesidades = Number(
    document.querySelector("#rangeNecesidades").value
  );
  let rangoEducacion = Number(document.querySelector("#rangeEducacion").value);
  let rangoAhorro = Number(document.querySelector("#rangeAhorro").value);
  let rangoDiversion = Number(document.querySelector("#rangeDiversion").value);
  let rangoInversion = Number(document.querySelector("#rangeInversion").value);
  let rangoDar = Number(document.querySelector("#rangeDar").value);

  let porcentajeTotal =
    rangoNecesidades +
    rangoEducacion +
    rangoAhorro +
    rangoDiversion +
    rangoInversion +
    rangoDar;

  console.log(porcentajeTotal);
  if (porcentajeTotal > 100) {
    alertError("La suma de porcentajes debe ser 100%");
    mostrarPorcentajes();
  } else {
    mostrarPorcentajeTotal.innerHTML = `${porcentajeTotal} %`;
  }
};

document
  .querySelector("#porcentaje")
  .addEventListener("change", tomarPorcentajes);

const guardarPorcentajes = (e) => {
  e.preventDefault();
  let rangoNecesidades = Number(
    document.querySelector("#rangeNecesidades").value
  );
  let rangoEducacion = Number(document.querySelector("#rangeEducacion").value);
  let rangoAhorro = Number(document.querySelector("#rangeAhorro").value);
  let rangoDiversion = Number(document.querySelector("#rangeDiversion").value);
  let rangoInversion = Number(document.querySelector("#rangeInversion").value);
  let rangoDar = Number(document.querySelector("#rangeDar").value);

  let porcentajeTotal =
    rangoNecesidades +
    rangoEducacion +
    rangoAhorro +
    rangoDiversion +
    rangoInversion +
    rangoDar;

  if (porcentajeTotal == 100) {
    jarrones[0].porcentaje = rangoNecesidades;
    jarrones[1].porcentaje = rangoEducacion;
    jarrones[2].porcentaje = rangoAhorro;
    jarrones[3].porcentaje = rangoDiversion;
    jarrones[4].porcentaje = rangoInversion;
    jarrones[5].porcentaje = rangoDar;
    localStorage.setItem("jarrones", JSON.stringify(jarrones));
    alertSucc("Nuevos porcentajes guardados");
  }
};

document
  .querySelector("#agregarIngreso")
  .addEventListener("click", guardarPorcentajes);
