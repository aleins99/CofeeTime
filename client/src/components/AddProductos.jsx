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
    <div className="w-full grid place-items-center my-10 ">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product_description"
          >
            Descripción
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product_description"
            type="text"
            placeholder="Descripción del producto"
            {...register("descripcion", { required: true })}
          />
          {errors.descripcion && (
            <span className="text-red-600">Este campo es requerido</span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product_price"
          >
            Precio
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="product_price"
            type="number"
            placeholder="50000"
            {...register("precio", { required: true })}
          />
          {errors.precio && (
            <span className="text-red-600">Este campo es requerido</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
