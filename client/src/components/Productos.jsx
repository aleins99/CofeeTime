import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
const Productos = ({ userId }) => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({
    "productos" :[],
    "total": 0
  })
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/cofee/api/productos/", {
      method: "GET" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      });
    fetch("http://localhost:8000/cofee/api/usuarios/" + userId, {
      method: "GET" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        setUser(userData);
      });
  }, [userId]);
  function addPeriod(num) {
    const strNum = num.toString();
    let slc = strNum.length;
    slc = slc % 2 === 0 ? slc / 2 - 1 : slc / 2;
    const newStrNum = strNum.slice(0, slc) + "." + strNum.slice(slc);
    return newStrNum;
  }
  const handleLocalStorage = async (data) => {
    let carritoProducto = await carrito.productos
    carritoProducto.push(data.descripcion)
    const obj = {
      "productos": carritoProducto,
      "total": data.precio + carrito?.total
    }
    setCarrito(obj);
  }
  return (
    <>
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
                <button className="text-white flex-end" onClick={(e) => handleLocalStorage(producto)}>
                  Agregar al carrito  
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {user.group_name === "recepcionista" && (
        <Link></Link>
      )}
      {user.group_name === "admin" && (
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
  userId: PropTypes.number,
};

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Agregar Producto
        </button>