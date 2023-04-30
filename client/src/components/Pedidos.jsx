import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Pedido from "./Pedido"
const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const location = useLocation()
  const [precio, setPrecio] = useState(0)
  useEffect(() => {
    fetch("http://localhost:8000/cofee/api/pedidos/", {
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
        setPedidos(data);
      });
  }, []);
  const handlePrecio = (data) => {
    setPrecio(data)
    return precio
  }
  return (
    <>
      <h2>Pedidos</h2>
      <ul>
      <Pedido location={location} precioTotal={handlePrecio} />
        {pedidos.map((pedido) => {
          return (
            <li key={pedido.id}>
             
            </li>
          );
        })}
      </ul>
      <p>Total: {precio }</p>
    </>
  );
};

export default Pedidos;
