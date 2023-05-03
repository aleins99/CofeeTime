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
    const response = await axios.post(
      "http://localhost:8000/cofee/api/token/",
      {
        username,
        password,
      }
    );
    if (response.status === 200) {
      window.localStorage.setItem("authToken", JSON.stringify(response.data));

      console.log("es esto", response.data);
      if (response.data.detail) {
        onError("Algo ha salido mal, Verifique sus credenciales");
      }
      if (response.data.username || response.data.password) {
        onError("Los campos no pueden estar en blanco");
      }
      console.log(jwtDecode(response.data.access).user_id);
      onLogin(jwtDecode(response.data.access).user_id);
    } else {
      console.error("Invalid");
    }
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
