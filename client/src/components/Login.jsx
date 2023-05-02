import { useState } from "react";
import coffeeIcon from "../assets/coffee.svg";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, onError] = useState("");
  const loginHandle = (e) => {
    e.preventDefault();
    // login and get an user with JWT token
    fetch("http://localhost:8000/cofee/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((tokenData) => {
        window.localStorage.setItem(
          "accessToken",
          JSON.stringify(tokenData.access)
        );
        console.log("es esto", tokenData);
        if (tokenData.detail) {
          onError("Algo ha salido mal, Verifique sus credenciales");
        }
        if (tokenData.username || tokenData.password) {
          onError("Los campos no pueden estar en blanco");
        }
        console.log(jwtDecode(tokenData.access).user_id);
        onLogin(jwtDecode(tokenData.access).user_id);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="login">
      <form onSubmit={loginHandle}>
        <img src={coffeeIcon} alt="Coffee Icon" width={100} />
        <h2>Coffee Time</h2>
        <p>Please login to your account</p>
        <input
          aria-label="Username"
          placeholder="Username"
          id="username"
          type="text"
          onChange={(e) => {
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
