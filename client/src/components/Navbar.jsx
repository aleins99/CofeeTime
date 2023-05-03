/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Carrito from "./Carrito";
import axiosInstance from "../utils/axiosInstance";

export default function Navbar({ onLogout, userId, carrito, countProductos }) {
  const [user, setUser] = useState();
  useEffect(() => {
    const handleUser = async () => {
      const response = await axiosInstance.get(`usuarios/${userId}`);
      if (response.status === 200) {
        setUser(response.data);
      }
    };
    handleUser();
  }, [userId]);

  const logoutHandler = () => {
    onLogout();
  };

  const role = user ? user.group_name : "";

  return (
    <div className="header">
      {user && (
        <nav className="navbar">
          <h2 className="left">
            Bienvenido {user.first_name + " " + user.last_name}!
          </h2>
          <ul>
            {role == "recepcionista" || role == "admin" ? (
              <li>
                <Link to={"/productos"}>Productos</Link>
              </li>
            ) : (
              ""
            )}
            {role === "admin" && (
              <li>
                <Link to={"/usuarios"}>Usuarios</Link>
              </li>
            )}
            {role == "recepcionista" || role == "cocinero" ? (
              <li>
                <Link to={"/pedidos"}>Pedidos</Link>
              </li>
            ) : (
              ""
            )}
            {role === "recepcionista" && (
              <Carrito carrito={carrito} countProductos={countProductos} />
            )}

            <li>
              {" "}
              <button
                className="text-white bg-blue-400"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userId: PropTypes.number,
};
