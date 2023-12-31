import { useState } from "react";
import coffeeIcon from "../assets/coffee.svg";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import axios from "axios";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, onError] = useState("");
  const loginHandle = async (e) => {
    e.preventDefault();
    // login and get an user with JWT token

    await axios
      .post("http://localhost:8000/cofee/api/token/", {
        username,
        password,
      })
      .then(function (response) {
        console.log(response.data);
        window.localStorage.setItem("authToken", JSON.stringify(response.data));
        onLogin(jwtDecode(response.data.access).user_id);
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          onError("Los campos no pueden estar en blanco");
        } else {
          onError("Algo ha salido mal, Verifique sus credenciales");
        }
      });
  };

  return (
    <div className="login dark:bg-slate-800 dark:text-white">
      <form onSubmit={loginHandle}>
        <img src={coffeeIcon} alt="Coffee Icon" width={100} />
        <h2>Coffee Time</h2>
        <p>Please login to your account</p>
        <input
          aria-label="Username"
          id="username"
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            setUsername(e.target.value);
          }}
        />
        <input
          aria-label="Password"
          placeholder="Password"
          id="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
export default Login;
