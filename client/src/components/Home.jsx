import { useState, useEffect } from "react";
import Productos from "./Productos";
import Navbar from "./Navbar";
import Usuarios from "./Usuarios";
import Pedidos from "./Pedidos";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductos from "./AddProductos";
import AddUser from "./AddUser";
const Home = ({ onLogout, userId }) => {
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

  const role = user ? user.group_name : null;
  console.log(user);

  let content = "";
  if (role === "recepcionista" || role === "cocinero") {
    content = <Pedidos />;
  } else if (role === "admin") {
    content = <Usuarios />;
  } else {
    content = "<h1>Home Page</h1>";
  }
  return (
    <BrowserRouter>
      <Navbar onLogout={onLogout} userId={userId} />
      {role !== "" && (
        <Routes>
          <Route path="/" element={<>{content}</>}></Route>
          <Route path="/pedidos" element={<Pedidos />}></Route>
          <Route
            path="/productos"
            element={<Productos userId={userId} />}
          ></Route>
          <Route path="/usuarios" element={<Usuarios />}></Route>
          <Route path="/producto/agregar/" element={<AddProductos />}></Route>
          <Route path="/usuario/agregar/" element={<AddUser />}></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
};
Home.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userId: PropTypes.number,
};
export default Home;
