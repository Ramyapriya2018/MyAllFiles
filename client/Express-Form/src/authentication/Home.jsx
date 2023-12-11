import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>
        Welcome <br />
        You are logged in!
      </h1>
      <button>
        <Link to="/">Login </Link>
      </button>
    </div>
  );
};

export default Home;
