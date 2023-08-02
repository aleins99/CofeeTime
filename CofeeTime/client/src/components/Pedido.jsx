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
  descripcion_tiempo,
  id,
  handlePedido,
}) => {
  pedidos = pedidos.split(",");
  const [estado, setEstado] = useState(pedido);
  const handleTiempoPreparacion = () => {
    // Calcular la diferencia de tiempo en milisegundos
    let diferencia = new Date().getTime() - new Date(fecha).getTime();
    var diferenciaEnSegundos = diferencia / 1000;

    // Convertir la diferencia de tiempo en minutos
    let diferenciaEnMinutos = Math.trunc(diferenciaEnSegundos / 60);

    // Convertir la diferencia de tiempo en horas
    let diferenciaEnHoras = Math.trunc(diferenciaEnMinutos / 60);

    // Imprimir la diferencia de tiempo en días, horas, minutos y
    let msg = "";
    if (diferenciaEnHoras > 0) {
      msg +=
        diferenciaEnHoras + " horas, con " + diferenciaEnMinutos + " minutos.";
    } else {
      msg += diferenciaEnMinutos + " minutos.";
    }
    console.log(msg);
    return msg;
  };
  async function handleData() {
    const data = {};
    data.pedido = "1";
    data.descripcion_tiempo = handleTiempoPreparacion();
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

  return (
    <li>
      <div className="grid grid-cols-3 max-w-sm rounded overflow-hidden shadow-lg px-4 py-8 pr-0 gap-2">
        <p className="col-start-4 col-end-5">
          {estado == "2" ? "En Proceso ⏱" : "Hecho ✅"}
        </p>
        <strong className="col-span-4">{cliente}</strong>
        {pedidos.map((e, index) => (
          <p key={index} className="col-span-4">
            ⭐ {e}
          </p>
        ))}
        <p className="col-span-4">
          <strong>Total💲: </strong>
          {addPeriod(cantidad)} Gs.
        </p>
        {estado == "1" && rol === "recepcionista" ? (
          <>
            {descripcion_tiempo !== "" && (
              <p className="col-span-4">
                <strong>Tiempo de preparación: </strong> {descripcion_tiempo}
              </p>
            )}
            <button
              className="col-start-3 col-end-6 mx-3 bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white flex-end dark:bg-blue-600"
              onClick={() => pagoPedido()}
            >
              <p className="w-full">Realizar pago</p>
            </button>
          </>
        ) : (
          ""
        )}
        {rol === "cocinero" && estado === "2" ? (
          <>
            <button
              className="bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white flex-end dark:bg-blue-600 col-start-4 col-end-4 mx-4"
              onClick={() => handleData()}
            >
              Pedido Listo
            </button>
          </>
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
  fecha: PropTypes.string,
  rol: PropTypes.string,
  id: PropTypes.number,
  handlePedido: PropTypes.func,
  descripcion_tiempo: PropTypes.string,
};
