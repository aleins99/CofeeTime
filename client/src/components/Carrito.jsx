/* eslint-disable react/prop-types */

import { Menu, Transition } from "@headlessui/react";
import cartIcon from "../assets/grocery-15.svg";
import { Fragment, useState, useEffect } from "react";
import { addPeriod } from "../utils/addPeriod";
import { Link } from "react-router-dom";

export default function Carrito({ carrito }) {
  // eslint-disable-next-line react/prop-types
  const [productos, setProductos] = useState(carrito.productos);
  console.log(productos);

  useEffect(() => {
    var filteredProducts = carrito.productos.filter(
      (item, index) => carrito.productos.indexOf(item) === index
    );
    console.log("filtros", filteredProducts);
    setProductos(filteredProducts);
  }, [carrito.productos, carrito.total]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="focus:border-rose-600">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-blue-300 hover:bg-blue-50 focus:outline-blue-400">
          <img src={cartIcon} className="h-5 w-5 max-w-none	" alt="" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-blue ring-opacity-5 focus:outline-none">
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-blue ring-opacity-5 focus:outline-none">
            {productos.map((link, index) => (
              <div className="py-1" key={index}>
                <Menu.Item as="a">
                  <p className="text-gray-900 w-full block px-4 py-2 text-sm">
                    {link}
                  </p>
                </Menu.Item>
              </div>
            ))}
            <Menu.Item as="a" className="w-full">
              <p className="text-red-500 w-full block px-4 py-2 text-sm">
                Total: {addPeriod(carrito.total)} Gs.
              </p>
            </Menu.Item>
            {carrito.total > 0 && (
              <Menu.Item as="a" className="w-full ">
                <Link
                  to="/pedido/agregar/"
                  className="w-full  text-sm bg-gray-200"
                >
                  <button className="w-full bg-slate-800 hover:bg-slate-700 dark:bg-blue-500 dark:hover:bg-blue-700 text-white">
                    Finalizar Pedido
                  </button>
                </Link>
              </Menu.Item>
            )}
          </Menu.Items>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
