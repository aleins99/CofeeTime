import PropTypes from "prop-types";
import { addPeriod } from "../utils/addPeriod";
import { useState, useEffect } from "react";
const Pedido = ({
  cliente,
  pedidos,
  cantidad,
  pedido,
  fecha,
  rol,
  id,
  handlePedido,
}) => {
  pedidos = pedidos.split(",");
  const [estado, setEstado] = useState(pedido);
  function handleData() {
    const data = {};
    data.pedido = "1";
    console.log(data);
    fetch(`http://localhost:8000/cofee/api/pedidos/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        setEstado("1");
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  function pagoPedido() {
    fetch(`http://localhost:8000/cofee/api/pedidos/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el dato");
        }
        handlePedido(parseInt(id));
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  console.log("rol", rol);
  return (
    <li>
      <div className="grid grid-cols-3 max-w-sm rounded overflow-hidden shadow-lg px-4 py-8 pr-0 gap-2">
        <p className="col-start-3 col-end-4">
          {estado == "2" ? "En Proceso ⏱" : "Hecho ✅"}
        </p>
        <p className="col-span-2">{fecha}</p>
        <p className="col-span-2">{cliente}</p>
        {pedidos.map((e, index) => (
          <p key={index} className="col-span-2">
            ⭐ {e}
          </p>
        ))}
        <p className="col-span-3">Total💲: {addPeriod(cantidad)} Gs.</p>
        {estado == "1" && rol === "recepcionista" ? (
          <button
            className="col-start-2 col-end-4"
            onClick={() => pagoPedido()}
          >
            <p className="w-full">Realizar pago</p>
          </button>
        ) : (
          ""
        )}
        {rol === "cocinero" && estado === "2" ? (
          <button
            className="col-start-3 col-end-4"
            onClick={() => handleData()}
          >
            Pedido Listo
          </button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};
export default Pedido;
Pedido.propTypes = {
  cliente: PropTypes.string,
  cantidad: PropTypes.number,
  pedido: PropTypes.string,
  pedidos: PropTypes.string,
  fecha: PropTypes.func,
  rol: PropTypes.string,
  id: PropTypes.string,
  handlePedido: PropTypes.func,
};
