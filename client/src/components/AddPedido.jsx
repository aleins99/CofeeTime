/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function AddPedidos({ carrito, setCarrito }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState("");
  useEffect(() => {
    const getLocalStorage = async () => {
      const total = await localStorage.getItem("total");
      const pedidos = await JSON.parse(
        window.localStorage.getItem("productos")
      );
      const filteredProducts = pedidos.filter(
        (item, index) => pedidos.indexOf(item) === index
      );
      setTotal(total);
      setProductos(filteredProducts.join(","));
    };
    getLocalStorage();
  });

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    data.pedidos = productos;
    data.cantidad = parseInt(total);
    data.pedido = "2";
    console.log("pedido", data);
    fetch("http://localhost:8000/cofee/api/pedidos/", {
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
        localStorage.removeItem("total");
        localStorage.removeItem("productos");
        /* eslint-disable react/prop-types */
        const initialState = {
          productos: [],
          total: 0,
        };
        setCarrito({ ...initialState });

        navigate("/pedidos");
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
            htmlFor="pedido_cliente"
          >
            Cliente
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pedido_cliente"
            type="text"
            placeholder="Alejandro Marin"
            {...register("cliente", { required: true })}
          />
          {errors.cliente && (
            <span className="text-red-600">Este campo es requerido</span>
          )}
        </div>
        <div className="mb-6 w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pedido_fecha"
          >
            Fecha
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pedido_fecha"
            type="date"
            placeholder="Alejandro Marin"
            {...register("fecha", { required: true })}
          />
          {errors.fecha && (
            <span className="text-red-600">Este campo es requerido</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Agregar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
