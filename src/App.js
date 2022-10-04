import { Route, Routes } from "react-router-dom";
import ProductsList from "./components/ProductsList.jsx";
import AddProduct from "./components/AddProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit/product-:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
