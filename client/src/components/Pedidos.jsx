import { useState, useEffect } from "react";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

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

  return (
    <>
      <h2>Pedidos</h2>
      <ul>
        {pedidos.map((pedido) => {
          return (
            <li key={pedido.id}>
              {pedido.descripcion} - {pedido.cantidad}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Pedidos;
