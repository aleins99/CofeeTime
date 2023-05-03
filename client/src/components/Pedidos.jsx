import { useState, useEffect } from "react";
import Pedido from "./Pedido";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const Pedidos = ({ rol, userId }) => {
  console.log("rol", rol);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

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
  const handlePedido = (id) => {
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  };
  return (
    <>
      {!pedidos && navigate("/")}
      <h1>Pedidos</h1>
      <ul className="grid lg:grid-cols-4 gap-4 grid-cols-2 md:grid-cols-3 place-content-center">
        {pedidos?.map((pedido) => {
          return (
            <Pedido
              key={pedido.id}
              {...pedido}
              rol={rol}
              userId={userId}
              handlePedido={handlePedido}
            />
          );
        })}
      </ul>
    </>
  );
};
Pedidos.propTypes = {
  rol: PropTypes.string,
  userId: PropTypes.string,
};
export default Pedidos;
