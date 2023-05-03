import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import jwtDecode from "jwt-decode";
function App() {
  const [userId, setUserId] = useState(null);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token) {
      setUserId(jwtDecode(JSON.parse(token)).user_id);
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  const onLoginHandler = (userId) => {
    console.log(userId);
    setUserId(userId);
  };

  const onLogoutHandler = () => {
    setUserId(null);
    window.localStorage.removeItem("accessToken");
  };

  return (
    <>
      {userId && login ? (
        <Home
          onLogout={onLogoutHandler}
          userId={userId}
          onLogin={onLoginHandler}
        />
      ) : (
        <Login onLogin={onLoginHandler} />
      )}
    </>
  );
}

export default App;
