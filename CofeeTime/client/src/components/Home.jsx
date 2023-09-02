import { useState, useEffect } from "react";
import Productos from "./Productos";
import Navbar from "./Navbar";
import Usuarios from "./Usuarios";
import Pedidos from "./Pedidos";
import PropTypes from "prop-types";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductoForm from "./ProductoForm";
import PedidoForm from "./PedidoForm";
import UsuarioForm from "./UsuarioForm";
import axiosInstance from "../utils/axiosInstance";
const Home = ({ onLogout, userId }) => {
  const [user, setUser] = useState();
  const [carrito, setCarrito] = useState({
    productos: [],
    total: 0,
  });
  const [countProductos, setCountProductos] = useState(0);

  useEffect(() => {
    let getUsuario = async () => {
      let response = await axiosInstance.get(`usuarios/${userId}/`);
      if (response.status === 200) {
        setUser(response.data);
      }
    };
    getUsuario();
  }, [userId]);

  const role = user ? user.group_name : null;
  console.log(user);

  let content = "";
  if (role === "recepcionista" || role === "cocinero") {
    content = (
      <Pedidos
        rol={role}
        carrito={carrito}
        setCarrito={setCarrito}
        countProductos={countProductos}
        setCountProductos={setCountProductos}
      />
    );
  } else if (role === "admin") {
    content = <Usuarios />;
  }
  return (
    <BrowserRouter>
      {role !== "" && (
        <div className="h-full">
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
            <Route path="/usuario/:id" element={<UsuarioForm />}></Route>
            <Route path="/producto/agregar/" element={<ProductoForm />}></Route>
            <Route path="/producto/:id" element={<ProductoForm />}></Route>
            <Route
              path="/pedido/agregar/"
              element={<PedidoForm setCarrito={setCarrito} carrito={carrito} />}
            ></Route>
          </Routes>
        </div>
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
