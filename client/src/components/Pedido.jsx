import {  useEffect, useState } from "react";
import PropTypes from "prop-types";

const Pedido = ({ descripcion, precio, location, precioTotal}) => {
    const price = location.state
    const [totalPrecio, setTotalPrecio] = useState(0)
    console.log(price)
    useEffect(()=>{
        let localStorage = JSON.parse(
            window.localStorage.getItem("precioTotal")
          )
        let precioAgregado = JSON.parse(
            window.localStorage.getItem("precioAgregado")
          )
        localStorage = parseInt(localStorage)
        
        if (localStorage && precioAgregado == 1) {
            window.localStorage.setItem(
                "precioTotal",
                JSON.stringify(localStorage + price)
              );
            window.localStorage.setItem(
                "precioAgregado",
                JSON.stringify(0)
            )
            
            setTotalPrecio(localStorage + price)
            console.log('precio', price)
        } else if(!localStorage) {
            console.log(2)            
            window.localStorage.setItem(
                "precioTotal",
                JSON.stringify(price)
              )
              window.localStorage.setItem(
                "precioAgregado",
                JSON.stringify(0)
            )
            
            setTotalPrecio(price)
        } else {
            setTotalPrecio(localStorage)
            window.localStorage.setItem(
                "precioAgregado",
                JSON.stringify(0)
            )
            
        }
    }, [])
    precioTotal(totalPrecio)

    return (
      <div>
        <p>{precio}</p>
        <p>{descripcion}</p>
      </div>  
    )
}
export default Pedido;
Pedido.propTypes = {
    descripcion: PropTypes.string,
    precio: PropTypes.number,
    location: PropTypes.object,
    precioTotal: PropTypes.func
};