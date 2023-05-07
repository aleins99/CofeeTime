/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addPeriod } from "../utils/addPeriod.js";
import PropTypes from "prop-types";
import axiosInstance from "../utils/axiosInstance.js";
import editBtn from "../assets/edit-btn.svg";
const Productos = (props) => {
  const [productos, setProductos] = useState([]);
  const { rol, carrito, setCarrito } = props;

  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProductos();
  }, []);
  let getProductos = async () => {
    let response = await axiosInstance.get("productos/");
    if (response.status === 200) {
      setProductos(response.data);
      console.log(productos);
    }
  };
  async function eliminarProducto(id) {
    const response = await axiosInstance.delete(`productos/${id}/`);
    console.log(response);
    if (response.status === 204) {
      setProductos(productos.filter((producto) => producto.id !== id));
    } else {
      console.error("Error al eliminar");
    }
  }

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(carrito.productos));
    localStorage.setItem("total", JSON.stringify(carrito.total));
    console.log(props);
  }, [carrito, props]);

  const handleLocalStorage = (data) => {
    // para mostrar mensaje de validacion
    setMostrarMensaje(true);
    setTimeout(() => {
      setMostrarMensaje(false);
    }, 1200);
    // agregar al carrito
    let carritoProducto = carrito.productos;
    carritoProducto.push(data.descripcion.toUpperCase());
    setCarrito((prevState) => ({
      productos: carritoProducto,
      total: prevState.total + data.precio,
    }));
  };
  return (
    <div className="px-5 py-5 dark:bg-slate-800 dark:text-white h-full">
      {mostrarMensaje && (
        <div className="w-full relative relative">
          <button className="absolute right-0 my-2 mx-5 bg-green-800 text-slate-100 animate-blunded">
            Agregado al carrito ✅
          </button>
        </div>
      )}
      <h1 className="text-center sm:text-left text-4xl">Productos</h1>

      <ul className="grid lg:grid-cols-4 gap-4 grid-cols-2 md:grid-cols-3 place-content-center">
        {productos.map((producto) => {
          return (
            <li
              key={producto.id}
              className="max-w-sm rounded overflow-hidden shadow-lg px-4 py-8 flex flex-col justify-between"
            >
              {producto.imagen && (
                <div className="w-full flex justify-between">
                  <img src={producto.imagen} className="w-[85px] h-25 my-5" />
                  {rol === "admin" && (
                    <img
                      src={editBtn}
                      alt="Boton de editar producto"
                      className="w-6 h-6 hover:cursor-pointer"
                      onClick={() => {
                        navigate(`/producto/${producto.id}`);
                      }}
                    />
                  )}
                </div>
              )}
              <p className="font-bold">{producto.descripcion.toUpperCase()}</p>
              <p className="">
                <strong>Precio:</strong>{" "}
                <span>{addPeriod(producto.precio)} G.s </span>{" "}
              </p>
              <div className="flex justify-end">
                {rol === "recepcionista" && (
                  <button
                    className="bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white flex-end dark:bg-blue-600"
                    onClick={() => handleLocalStorage(producto)}
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
              <div className="flex justify-end">
                {rol === "admin" && (
                  <button
                    className="bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white flex-end dark:bg-blue-600"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar Producto
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {rol === "admin" && (
        <Link to="/producto/agregar/">
          <button className="my-10 bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agregar Producto
          </button>
        </Link>
      )}
    </div>
  );
};

export default Productos;
Productos.propTypes = {
  group: PropTypes.string,
};
