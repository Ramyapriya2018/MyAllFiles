import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/signup", { name, email, password })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);

        if (
          err.response &&
          err.response.data &&
          err.response.data.error === "Email already exists"
        ) {
          setError("Email already exists. Please choose a different email.");
        } else {
          setError("An error occurred during signup.");
        }
      });
  };

  return (
    <div className="wrapper">
      <h1>SignUp</h1>

      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="inputfield">
            <label>Name</label>
            <input
              autoComplete="off"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="inputfield">
            <label>Email</label>
            <input
              autoComplete="off"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="inputfield">
            <label>Password</label>
            <input
              autoComplete="off"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter a Password"
              required
            />
          </div>{" "}
          {error && <div className="error-message">{error}</div>}
          <button type="submit">SignUp</button>
          <div className="inputfield btns">
            <h4>Already Have An Account?</h4>

            <Link to="/Login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Signup;
