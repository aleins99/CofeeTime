import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Productos = () => {
  const [productos, setProductos] = useState([]);

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
  }, []);

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
              <p>{producto.descripcion}.</p>
              <p>
                Precio: <span>{producto.precio} </span>{" "}
              </p>
            </li>
          );
        })}
      </ul>
      <Link to="/producto/agregar">Agregar Producto</Link>
    </>
  );
};

export default Productos;
