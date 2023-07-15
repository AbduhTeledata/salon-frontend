import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import { numberWithCommas } from '../utils/utils';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
    
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`http://localhost:5000/products/${productId}`);
    getProducts();
  };

  return (
    <div className='flex flex-col'>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden"></div>
      <h1 className="title">Kyoshi Beauty</h1>
      <h2 className="subtitle">Daftar Jasa dan Layanan</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Tambah Jasa
      </Link>
      <table className='min-w-full text-left text-sm font-light'>
        <thead className='border-b font-bold dark:border-neutral-500'>
          <tr>
            <th scope="col" className="px-4 py-2">No</th>
            <th scope="col" className="px-4 py-2">Nama Jasa</th>
            <th scope="col" className="px-4 py-2">Harga</th>
            <th scope="col" className="px-4 py-2">Dibuat</th>
            <th scope="col" className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <>
            <tr 
               className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              key={product.uuid}>
              <td className="whitespace-nowrap px-4 py-2 font-medium">{index + 1}</td>
              <td className="whitespace-nowrap px-4 py-2">{product.name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-right">{numberWithCommas(product.price)}</td>
              <td className="whitespace-nowrap px-4 py-2">{product.user.name}</td>
              <td>
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
            </>
          ))}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList
