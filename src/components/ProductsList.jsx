import React from "react";
import axios from "axios";
import useSwr, { useSWRConfig } from "swr";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const products = await axios.get(
      `${process.env.REACT_APP_DOMAIN}/api/products`
    );
    return products.data;
  };

  const { data, error } = useSwr("products", fetcher);
  if (!data) return <h2 className="text-center">Loading...</h2>;
  if (error) return <h2 className="text-center">Error</h2>;

  const deleteProduct = async (id) => {
    await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/product-${id}`);
  };
  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to="/add-product"
          className="bg-green-500 hover:bg-green-700 text-white border-slate-200 border font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-6">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No.</th>
                <th className="py-3 px-1">Product Name</th>
                <th className="py-3 px-1">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => (
                <tr key={product.id} className="bg-white border-b">
                  <td className="py-3 px-1 text-center">{index + 1}</td>
                  <td className="py-3 px-1 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="py-3 px-1">{product.price}</td>
                  <td className="py-3 px-1 text-center">
                    <Link
                      to={`/edit/product-${product.id}`}
                      className="font-medium bg-blue-400 hover:bg-blue-600 px-3 py-1 rounded text-white mr-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        deleteProduct(product.id);
                        mutate("products");
                      }}
                      className="font-medium bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-white mr-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
