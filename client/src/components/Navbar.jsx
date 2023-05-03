/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Carrito from "./Carrito";

export default function Navbar({ onLogout, userId, carrito, countProductos }) {
  const [user, setUser] = useState();
  useEffect(() => {
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

  const logoutHandler = () => {
    onLogout();
  };

  const role = user ? user.group_name : "";

  return (
    <div className="header">
      {user && (
        <nav className="navbar">
          <h2 className="left">Bienvenido {user.username}!</h2>
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
