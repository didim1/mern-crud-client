import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_DOMAIN}/api/product`, {
      name,
      price: parseInt(price),
    });
    navigate("/");
  };
  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form className="my-10" onSubmit={saveProduct}>
        <div className="flex flex-col">
          <div className="mb-5">
            <label htmlFor="name" className="font-bold text-slate-700">
              Product Name
            </label>
            <input
              required
              type="text"
              name="productName"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="price" className="font-bold text-slate-700">
              Product Price
            </label>
            <input
              required
              type="number"
              name="productPrice"
              id="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-400 rounded-lg border-indigo-500 hover:shadow"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
