import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Register from "./pages/Register";
import axios from "axios";
import { RedirectToUsers } from "./components/RedirectToUsers";
import Links from "./pages/Links";
import Products from "./pages/products/Products";
import ProductForm from "./pages/products/ProductForm";

axios.defaults.baseURL = "http://localhost:8000/api/admin/"
axios.defaults.withCredentials = true

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToUsers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />}  />
          <Route path="/register" element={<Register />}  />
          <Route path="/users/:id/links" element={<Links />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
