import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/login", { email, password })
      .then((res) => {
        console.log("Response Data:", res);
        console.log(res.data.message);
        if (res.data.token) {
          try {
            localStorage.setItem("token", res.data.token);
            makeAuthenticatedRequest();
            navigate("/home");
            // console.log(res.data);
          } catch (error) {
            console.error("Error setting token in local storage:", error);
            setErrormessage("An error occurred. Please try again later.");
          }
        } else {
          setErrormessage(
            res.data.message || "Invalid credentials. Please try again."
          );
        }
      })
      .catch((err) => {
        console.log(err);

        setErrormessage("Authentication failed. Please log in again.");
      });
  };

  const makeAuthenticatedRequest = () => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/Signup", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("Authenticated Request Response Data:", res);
      })
      .catch((err) => {
        setErrormessage("Authentication failed. Please log in again.");
        console.log("Authenticated Request Error:", err);
      });
  };

  return (
    <div className="wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          autoComplete="off"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errormessage && <p className="error-message">{errormessage}</p>}
        <button type="submit">Login</button>
        {/* <h3>Do Not Have An Account</h3> <Link to="/">SignUp </Link> */}
      </form>
    </div>
  );
}

export default Login;
