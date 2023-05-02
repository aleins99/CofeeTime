import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { addPeriod } from "../utils/addPeriod.js";
import PropTypes from "prop-types";
const Productos = ({ userId }) => {
  console.log(userId);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState({
    productos: [],
    total: 0,
  });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [items, setItems] = useState(0);
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
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(carrito.productos));
    localStorage.setItem("total", JSON.stringify(carrito.total));
  }, [carrito]);

  const handleLocalStorage = (data) => {
    setItems(1);
    setMostrarMensaje(true);
    setTimeout(() => {
      setMostrarMensaje(false);
    }, 1200);
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
                {user.group_name === "recepcionista" && (
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
      {user.group_name === "recepcionista" && items == 1 ? (
        <Link to="/pedido/agregar/">
          <button className="my-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Finalizar Pedido
          </button>
        </Link>
      ) : (
        ""
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
</button>;
