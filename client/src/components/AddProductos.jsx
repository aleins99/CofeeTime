import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function AddProductos() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    fetch("http://localhost:8000/cofee/api/productos/", {
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
        navigate("/productos");
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea
          name="product_description"
          id="product_description"
          placeholder="Descripción"
          rows="10"
          {...register("descripcion", { required: true })}
        ></textarea>
        {errors.descripcion && <span>Este campo es requerido</span>}

        <input
          type="text"
          name="product_price"
          id="product_price"
          {...register("precio", { required: true })}
        />
        {errors.descripcion && <span>Este campo es requerido</span>}

        <button>Guardar</button>
      </form>
    </div>
  );
}
