import React, { SyntheticEvent, useState, useEffect } from 'react'
import axios from "axios";
import { API_URL } from '../utils/constants';
import { useRoutes } from "react-router-dom";

const AddToCartModal = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    

  const getProducts = async () => {
      const response = await axios.get(API_URL + 'products');
      setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  function handleChange(props) {

      setModal(!modal);
  }

  return (
    
    <div>
      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Daftar Jasa
      </button>
      <div>
        <form onSubmit={(e) =>{
          e.preventDefault();
          console.log('hello add product');
          console.log(products.id, products.name, products.price);
          addItemHandler(products.id, products.name, products.price);
        }}>
          {showModal ? (
            <div className='modal'>
              <div className='modal-box'>
              <div
                className="justify-center items-center overflow-auto flex fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Jasa dan Layanan
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="overflow-y-auto h-[300px] relative p-2 flex-auto">
                      {/* <h3 className="font-bold text-lg">Daftar Jasa dan Layanan</h3> */}
                      <table className=" relative w-full p-2 text-left text-sm">
                        <thead>
                          <tr>
                            <th className="text-center">No.</th>
                            <th className="text-center">Jasa</th>
                            <th className="text-center">Harga</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                            <tr key={product.uuid}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                  <div className="modal-action">
                                    {!isMutating ? (
                                      <button 
                                        type="submit"
                                        className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                                       >
                                        Pilih
                                      </button>
                                      //  onClick={handleChange}
                                    ) : (
                                      <button type="button" className="btn loading">
                                        Saving...
                                      </button>
                                    )}
                                  </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      {/* <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save Changes
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black">
              </div>
              </div>
            </div>   
          ) : null}
        </form>
      </div> 
    </div>
  )
}

export default AddToCartModal
