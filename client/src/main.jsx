import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

function Root() {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      setUserId(jwtDecode(JSON.parse(token)).user_id);
    }
    console.log(userId);
  }, []);

  const onLoginHandler = (userId) => {
    console.log("userrrr", userId);
    setUserId(userId);
  };

  return <>{userId ? <App /> : <Login onLogin={onLoginHandler} />}</>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
