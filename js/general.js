const borrarTodo = () => {
  Swal.fire({
    title: "Estas seguro/a?",
    text: "No puedes revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Borrar todo!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      reload();
    }
  });
};

const reload = () => {
  location.reload();
};

document.querySelector("#borrarTodo").addEventListener("click", borrarTodo);
