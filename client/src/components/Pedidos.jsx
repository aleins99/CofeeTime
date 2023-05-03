import { useState, useEffect } from "react";
import Pedido from "./Pedido";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const Pedidos = ({ rol, userId }) => {
  console.log("rol", rol);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPedidos();
  }, []);
  let getPedidos = async () => {
    let response = await axiosInstance.get("pedidos/");
    if (response.status === 200) {
      setPedidos(response.data);
    }
  };
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
