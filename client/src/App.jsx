import { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import jwtDecode from "jwt-decode";
function App() {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      setUserId(jwtDecode(JSON.parse(token).access).user_id);
    }
  }, []);

  const onLoginHandler = (userId) => {
    console.log(userId);
    setUserId(userId);
  };

  const onLogoutHandler = () => {
    setUserId(null);
    window.localStorage.removeItem("authToken");
  };

  return (
    <>
      {userId ? (
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
