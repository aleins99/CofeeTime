import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
export default function ProductoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const params = useParams();
  useEffect(() => {
    async function cargarProducto() {
      if (params.id) {
        const { data } = await axiosInstance.get(`productos/${params.id}/`);
        setValue("descripcion", data.descripcion);
        setValue("precio", data.precio);
        console.log(data.imagen);
        setValue("imagen", data.imagen);
      }
    }
    cargarProducto();
  }, []);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  const onSubmit = handleSubmit(async (data) => {
    if (!params.id) {
      let form_data = new FormData();
      form_data.append("descripcion", data.descripcion);
      form_data.append("precio", parseInt(data.precio));
      form_data.append("imagen", image);

      const response = await axiosInstance.post("productos/", form_data);
      if (response.status === 201) {
        navigate("/productos");
      } else {
        console.error("Invalid");
      }
    } else {
      let form_data = new FormData();

      form_data.append("descripcion", data.descripcion);
      form_data.append("precio", parseInt(data.precio));
      form_data.append("imagen", image);
      console.log(form_data);
      const response = await axiosInstance.patch(
        `productos/${params.id}/`,
        form_data
      );
      if (response.status === 200) {
        navigate("/productos");
      } else {
        console.error("Invalid");
      }
    }
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
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product_image"
          >
            Imagen
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product_image"
            type="file"
            onChange={handleImageUpload}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {params.id ? "Editar Producto" : "Agregar Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
