import { useState, useEffect } from "react";
import Productos from "./Productos";
import Navbar from "./Navbar";
import Usuarios from "./Usuarios";
import Pedidos from "./Pedidos";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProductos from "./AddProductos";
import AddPedido from "./AddPedido";
import Login from "./Login";
const Home = ({ onLogout, userId, onLogin }) => {
  const [user, setUser] = useState();
  const [carrito, setCarrito] = useState({
    productos: [],
    total: 0,
  });
  const [countProductos, setCountProductos] = useState(0);

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
    content = <Pedidos rol={role} />;
  } else if (role === "admin") {
    content = <Usuarios />;
  } else {
    content = "<h1>Home Page</h1>";
  }
  return (
    <BrowserRouter>
      {role !== "" ? (
        <>
          <Navbar
            onLogout={onLogout}
            userId={userId}
            carrito={carrito}
            countProductos={countProductos}
          />
          <Routes>
            <Route path="/" element={<>{content}</>}></Route>
            <Route path="/pedidos" element={<Pedidos rol={role} />}></Route>
            <Route
              path="/productos"
              element={
                <Productos
                  rol={role}
                  carrito={carrito}
                  setCarrito={setCarrito}
                  countProductos={countProductos}
                  setCountProductos={setCountProductos}
                />
              }
            ></Route>
            <Route path="/usuarios" element={<Usuarios />}></Route>
            <Route path="/producto/agregar/" element={<AddProductos />}></Route>
            <Route
              path="/pedido/agregar/"
              element={<AddPedido setCarrito={setCarrito} carrito={carrito} />}
            ></Route>
          </Routes>
        </>
      ) : (
        <Login onLogin={onLogin} />
      )}
    </BrowserRouter>
  );
};
Home.propTypes = {
  onLogout: PropTypes.func.isRequired,
  userId: PropTypes.number,
  onLogin: PropTypes.func.isRequired,
};
export default Home;
