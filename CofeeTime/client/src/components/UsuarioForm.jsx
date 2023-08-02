import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
export default function ProductoForm() {
  const navigate = useNavigate();
  const params = useParams();
  const [rol, setRol] = useState("");
  useEffect(() => {
    async function cargarUsuario() {
      if (params.id) {
        const { data } = await axiosInstance.patch(`usuarios/${params.id}/`);
        setRol(data.group_name);
      }
    }
    cargarUsuario();
  }, [params.id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const response = await axiosInstance.patch(
      `usuarios/${params.id}/`,
      formJson
    );
    if (response.status === 200) {
      navigate("/usuarios");
    } else {
      console.error("Invalid");
    }
  };
  return (
    <div className="w-full grid place-items-center  dark:bg-slate-800 dark:text-white h-full ">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4 w-2/6  dark:bg-slate-800 dark:text-white"
      >
        <div className="mb-4 w-80px w-full">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="usuario_rol"
          >
            Rol
          </label>
          <select
            name="group_name"
            id="group_name"
            defaultValue={rol}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Escoger Rol</option>

            <option value="cocinero">Cocinero</option>
            <option value="recepcionista">Recepcionista</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Editar Usuario
          </button>
        </div>
      </form>
    </div>
  );
}
