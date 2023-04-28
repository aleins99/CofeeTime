import { useState, useEffect } from "react";
import userIcon from "../assets/user.svg";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/cofee/api/usuarios/", {
      method: "GET" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          window.localStorage.getItem("accessToken")
        )}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
      });
  }, []);
  return (
    <>
      <h1 className="text-center sm:text-left text-4xl">Lista de Usuarios</h1>
      <ul className="grid lg:grid-cols-4 gap-4 grid-cols-2 md:grid-cols-3 place-content-center">
        {usuarios.map((usuario) => {
          return (
            usuario.group_name !== "admin" && (
              <li
                key={usuario.id}
                className="max-w-sm rounded overflow-hidden shadow-lg px-4 py-8"
              >
                <div className="grid grid-cols-3">
                  <img className="w-8" src={userIcon} alt="" />
                  <span className="text-gray-800 col-span-2">
                    {usuario.first_name} {usuario.last_name}
                  </span>
                </div>

                <p className="text-blue-800 text-base ">
                  Nombre de usuario:{" "}
                  <span className="text-gray-800">{usuario.username} </span>
                </p>
                <p className="text-blue-800 text-base">
                  Rol:{" "}
                  <span className="text-gray-800">{usuario.group_name}</span>
                </p>
              </li>
            )
          );
        })}
      </ul>
    </>
  );
};

export default Usuarios;
