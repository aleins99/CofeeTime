import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    fetch("http://localhost:8000/cofee/api/usuarios/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        navigate("/usuarios");
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="user_username"
          id="user_username"
          placeholder="Nombre: "
          {...register("username", { required: true })}
        />
        <input
          type="text"
          name="user_firstName"
          id="user_firstName"
          placeholder="Nombre: "
          {...register("first_name", { required: true })}
        />
        {errors.first_name && <span>Este campo es requerido</span>}
        <label htmlFor="user_lastName">Apellidos: </label>
        <input
          type="text"
          name="user_lastName"
          id="user_lastName"
          placeholder="Apellidos: "
          {...register("last_name", { required: true })}
        />
        {errors.last_name && <span>Este campo es requerido</span>}
        <label htmlFor="user_group">Grupo de Usuario:</label>
        <input
          type="text"
          id="user_group"
          name="user_group"
          {...register("group_name", { required: true })}
        />

        {errors.group_name && <span>Este campo es requerido</span>}

        <button>Guardar</button>
      </form>
    </div>
  );
}
