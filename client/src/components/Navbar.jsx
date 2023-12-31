/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Carrito from "./Carrito";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
export default function Navbar({ onLogout, userId, carrito, countProductos }) {
  const [user, setUser] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleUser = async () => {
      const response = await axiosInstance.get(`usuarios/${userId}/`);
      if (response.status === 200) {
        setUser(response.data);
      }
    };
    handleUser();
  }, [userId]);

  const logoutHandler = () => {
    navigate("/");
    onLogout();
  };
  const role = user ? user.group_name : "";

  return (
    <header className="header">
      {user && (
        <nav className="navbar bg-amber-700 dark:bg-slate-700">
          <ul className="flex justify-between w-full">
            <h2 className="left text-white">
              Bienvenido {user.first_name + " " + user.last_name}!
            </h2>
            <div className="flex gap-10">
              {role == "recepcionista" || role == "admin" ? (
                <li>
                  <Link to={"/productos"}>
                    <p
                      className={
                        location.pathname === "/productos"
                          ? "text-white underline underline-offset-8"
                          : "text-slate-200"
                      }
                    >
                      Productos
                    </p>
                  </Link>
                </li>
              ) : (
                ""
              )}
              {role === "admin" && (
                <li>
                  <Link to={"/usuarios"}>
                    <p
                      className={
                        location.pathname === "/usuarios"
                          ? "text-white underline underline-offset-8"
                          : "text-slate-200"
                      }
                    >
                      Usuarios
                    </p>
                  </Link>
                </li>
              )}
              {role == "recepcionista" || role == "cocinero" ? (
                <li>
                  <Link to={"/pedidos"}>
                    <p
                      className={
                        location.pathname === "/pedidos"
                          ? "text-white underline underline-offset-8"
                          : "text-slate-200"
                      }
                    >
                      Pedidos
                    </p>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </div>
            <div className="flex gap-5">
              {role === "recepcionista" && (
                <Carrito carrito={carrito} countProductos={countProductos} />
              )}

              <li>
                <button
                  className="text-white bg-stone-500 hover:bg-stone-600 dark:bg-blue-400"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
}
Navbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userId: PropTypes.number,
};
