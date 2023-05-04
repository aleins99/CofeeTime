import PropTypes from "prop-types";
import { addPeriod } from "../utils/addPeriod";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

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
  async function handleData() {
    const data = {};
    data.pedido = "1";
    const response = await axiosInstance.patch(`pedidos/${id}/`, data);
    if (response.status === 200) {
      setEstado("1");
    }
  }
  async function pagoPedido() {
    const response = await axiosInstance.delete(`pedidos/${id}/`);
    console.log(response);
    if (response.status === 204) {
      handlePedido(parseInt(id));
    } else {
      console.error("Error al eliminar");
    }
  }
  console.log("rol", rol);
  return (
    <li>
      <div className="grid grid-cols-3 max-w-sm rounded overflow-hidden shadow-lg px-4 py-8 pr-0 gap-2">
        <p className="col-start-4 col-end-5">
          {estado == "2" ? "En Proceso ⏱" : "Hecho ✅"}
        </p>
        <p className="col-span-4">{fecha}</p>
        <p className="col-span-4">{cliente}</p>
        {pedidos.map((e, index) => (
          <p key={index} className="col-span-2">
            ⭐ {e}
          </p>
        ))}
        <p className="col-span-4">Total💲: {addPeriod(cantidad)} Gs.</p>
        {estado == "1" && rol === "recepcionista" ? (
          <button
            className="col-start-3 col-end-6 mx-3 bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white flex-end dark:bg-blue-600"
            onClick={() => pagoPedido()}
          >
            <p className="w-full">Realizar pago</p>
          </button>
        ) : (
          ""
        )}
        {rol === "cocinero" && estado === "2" ? (
          <button
            className="bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white flex-end dark:bg-blue-600 col-start-4 col-end-4 mx-4"
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
