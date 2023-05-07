/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
export default function PedidoForms({ setCarrito }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [total, setTotal] = useState(0);
  const [productos, setProductos] = useState("");
  useEffect(() => {
    const getLocalStorage = () => {
      const total = localStorage.getItem("total");
      const pedidos = JSON.parse(window.localStorage.getItem("productos"));
      console.log(pedidos);
      const filteredProducts = pedidos.filter(
        (item, index) => pedidos.indexOf(item) === index
      );
      setTotal(total);
      setProductos(filteredProducts.join(","));
    };
    getLocalStorage();
  }, []);

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    data.pedidos = productos;
    data.cantidad = parseInt(total);
    data.pedido = "2";
    console.log(data);
    const response = await axiosInstance.post("pedidos/", data);
    if (response.status === 201) {
      localStorage.removeItem("total");
      localStorage.removeItem("productos");
      /* eslint-disable react/prop-types */
      const initialState = {
        productos: [],
        total: 0,
      };
      setCarrito({ ...initialState });
      navigate("/pedidos");
    } else {
      console.error("Invalid");
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

        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Agregar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}
