import "./App.css";
import Login from"./components/Login"
import Signup from "./components/Signup";
import Home from"./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
       
        </Routes>
      </BrowserRouter>
    </div>
  );
};
