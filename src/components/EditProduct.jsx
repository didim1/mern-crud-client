import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProductById = async () => {
      const product = await axios.get(
        `${process.env.REACT_APP_DOMAIN}/api/product-${id}`
      );
      setProductName(product.data.name);
      setProductPrice(product.data.price);
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    await axios.put(`${process.env.REACT_APP_DOMAIN}/api/product-${id}`, {
      name: productName,
      price: parseInt(productPrice),
    });
    navigate("/");
  };
  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form className="my-10" onSubmit={updateProduct}>
        <div className="flex flex-col">
          <div className="mb-5">
            <label htmlFor="name" className="font-bold text-slate-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              id="name"
              placeholder="Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="font-bold text-slate-700">
              Product Price
            </label>
            <input
              type="number"
              name="productPrice"
              id="price"
              placeholder="Price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-400 rounded-lg border-indigo-500 hover:shadow"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
