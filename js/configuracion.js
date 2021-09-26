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
  jarrones = await obtenerJarrones(); // obtengo datos de los jarrones

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
  mostrarPorcentajeNecesidades.innerHTML = `${rangoNecesidades}%`;
  mostrarPorcentajeEducacion.innerHTML = `${rangoEducacion} %`;
  mostrarPorcentajeAhorro.innerHTML = `${rangoAhorro} %`;
  mostrarPorcentajeDiversion.innerHTML = `${rangoDiversion} %`;
  mostrarPorcentajeInversion.innerHTML = `${rangoInversion} %`;
  mostrarPorcentajeDar.innerHTML = `${rangoDar} %`;
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
    alert("la suma de los porcentajes tiene que ser 100");
    mostrarPorcentajes();
  } else {
    mostrarPorcentajeTotal.innerHTML = `${porcentajeTotal} %`;
    mostrarPorcentajeNecesidades.innerHTML = `${rangoNecesidades}%`;
    mostrarPorcentajeEducacion.innerHTML = `${rangoEducacion} %`;
    mostrarPorcentajeAhorro.innerHTML = `${rangoAhorro} %`;
    mostrarPorcentajeDiversion.innerHTML = `${rangoDiversion} %`;
    mostrarPorcentajeInversion.innerHTML = `${rangoInversion} %`;
    mostrarPorcentajeDar.innerHTML = `${rangoDar} %`;
  }
};

document
  .querySelector("#porcentaje")
  .addEventListener("change", tomarPorcentajes);

// const guardarPorcentajes = () => {
//     let rangoNecesidades = Number(
//         document.querySelector("#rangeNecesidades").value
//       );
//       let rangoEducacion = Number(document.querySelector("#rangeEducacion").value);
//       let rangoAhorro = Number(document.querySelector("#rangeAhorro").value);
//       let rangoDiversion = Number(document.querySelector("#rangeDiversion").value);
//       let rangoInversion = Number(document.querySelector("#rangeInversion").value);
//       let rangoDar = Number(document.querySelector("#rangeDar").value);

//       jarrones =

//       localStorage.setItem("jarrones", JSON.stringify(jarrones));

// }

//   let rangoNecesidades = document.querySelector("#rangeNecesidades").value;
//   let rangoEducacion = document.querySelector("#rangeEducacion").value;
//   let rangoAhorro = document.querySelector("#rangeAhorro").value;
//   let rangoDiversion = document.querySelector("#rangeDiversion").value;
//   let rangoInversion = document.querySelector("#rangeInversion").value;
//   let rangoDar = document.querySelector("#rangeDar").value;

//   let porcentajeTotal =
//     rangoNecesidades +
//     rangoEducacion +
//     rangoAhorro +
//     rangoDiversion +
//     rangoInversion +
//     rangoDar;

//   if (porcentajeTotal > 100) {
//     alert("la suma de los porcentajes tiene que ser 100");
//   }
