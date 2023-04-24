import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="login">
        <form action="POST">
          <label htmlFor="username">First name:</label>
          <br />
          <input type="text" id="username" name="username" placeholder="John" />
          <br />
          <label htmlFor="password">Last name:</label>
          <br />
          <input type="text" id="lname" name="lname" placeholder="Doe" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
