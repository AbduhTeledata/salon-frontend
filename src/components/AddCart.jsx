import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import CartItem from './CartItem';
import { numberWithCommas } from '../utils/utils';

const AddCart = (props) => {
    const [id, setId] = useState('')
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [products, setProducts] = useState([]);
    const [isMutating, setIsMutating] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getProducts = async () => {
        const response = await axios.get(API_URL + 'products');
        setProducts(response.data);
    };
  
    useEffect(() => {
      getProducts();
    }, []);

    const productsdetails = (e) =>{
        let index = +e.currentTarget.getAttribute('data-index')
        console.log(products[index].id);
        console.log(products[index]);
        console.log(products[index].name);
        console.log(products[index].price);
        setId(products[index].id); //qty di form tdk aktif apabila dikirim productId
        setName(products[index].name);
        setPrice(products[index].price);
        setQty(1);
    };

  return (
    <>
    <button 
        onClick={handleShow}
        className="block mx-auto m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
          + Tambah Jasa
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={(e) => {
                e.preventDefault();
                // setId('');
                // setName('');
                // setQty('');
                // setPrice('');
                props.newItem(name, qty, price);
            }}
                id='addmodal' 
                className="w-full max-w-sm">
                <div className="overflow-y-auto h-[300px] relative p-2 flex-auto">
                      <table className=" relative w-full p-2 text-left text-sm">
                        <thead>
                          <tr>
                            {/* <th className="text-center">ID</th> */}
                            <th className="text-center">No.</th>
                            <th className="text-center">Jasa</th>
                            <th className="text-center">Harga</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                            <tr key={index} data-index={index} onClick={productsdetails}>
                                <td>{index + 1}</td>
                                {/* <td>{product.id}</td> */}
                                <td>{product.name}</td>
                                <td>{numberWithCommas(product.price)}</td>
                                <td>
                                  <div className="modal-action">
                                    {!isMutating ? (
                                      <button 
                                        type="submit"
                                        className="bg-emerald-500 text-white active:bg-emerald-600 text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                                        form='addmodal'
                                       >
                                        Pilih
                                      </button>
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
                {/* <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label 
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                            htmlFor="name">
                            Jasa
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            id="name" 
                            placeholder='Nama'
                            type="text" 
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label 
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                            htmlFor="role">
                            Qty
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            id="role" 
                            placeholder='Role'
                            type="text" 
                            value={qty} 
                            onChange={(e) => {
                                setQty(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label 
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" 
                            htmlFor="img">
                            Price
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input 
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            id="img" 
                            placeholder='https://google.com/'
                            type="text" 
                            value={price} 
                            onChange={(e) => {
                                setPrice(e.target.value)
                            }}
                        />
                    </div>
                </div> */}
            </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <button 
            className='bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded' 
            onClick={handleClose}
          >
            Close
          </button>
          <button 
            className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' 
            onClick={handleClose}
            form='addmodal'
          >
            Add
          </button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default AddCart