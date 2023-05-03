/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addPeriod } from "../utils/addPeriod.js";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
const Productos = (props) => {
  const [productos, setProductos] = useState([]);
  const { rol, carrito, setCarrito, countProductos, setCountProductos } = props;

  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [items, setItems] = useState(0);

  useEffect(() => {
    getProductos();
  });
  let getProductos = async () => {
    let response = await axiosInstance.get("productos/");
    if (response.status === 200) {
      setProductos(response.data);
    }
  };
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(carrito.productos));
    localStorage.setItem("total", JSON.stringify(carrito.total));
    console.log(props);
  }, [carrito, props]);

  const handleLocalStorage = (data) => {
    // para mostrar mensaje de validacion
    setItems(1);
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
    <>
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
              className="max-w-sm rounded overflow-hidden shadow-lg px-4 py-8"
            >
              <p>{producto.descripcion.toUpperCase()}</p>
              <p className="text-gray-800">
                Precio: <span>{addPeriod(producto.precio)} G.s </span>{" "}
              </p>
              <div className="flex justify-end">
                {rol === "recepcionista" && (
                  <button
                    className="text-white flex-end bg-blue-600"
                    onClick={() => handleLocalStorage(producto)}
                  >
                    Agregar al carrito
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {rol === "admin" && (
        <Link to="/producto/agregar/">
          <button className="my-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Agregar Producto
          </button>
        </Link>
      )}
    </>
  );
};

export default Productos;
Productos.propTypes = {
  group: PropTypes.string,
};

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
  Agregar Producto
</button>;
