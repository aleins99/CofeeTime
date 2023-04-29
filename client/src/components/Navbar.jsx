import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Navbar({ onLogout, userId }) {
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
                <Link to={"/pedidos"}>Carrito</Link>
              </li>
            ) : (
              ""
            )}
            <li>
              {" "}
              <button className="text-white" onClick={logoutHandler}>Logout</button>
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