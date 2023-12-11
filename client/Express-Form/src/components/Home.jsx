// import { useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  // axios.defaults.withCredentials = true;
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/home")
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data !== "Success") {
  //         // navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // const navigate = useNavigate();
  return (
    <div>
      <h1>You are logged in!</h1>
      <button>
        <Link to="/">SignUp </Link>
      </button>
    </div>
  );
};

export default Home;
