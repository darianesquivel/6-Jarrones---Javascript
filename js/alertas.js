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
