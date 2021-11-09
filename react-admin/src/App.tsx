import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Register from "./pages/Register";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/admin/"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/login" element={<Login />}  />
          <Route path="/register" element={<Register />}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
