import React, { useState, useRef, useEffect } from 'react'
import axios from "axios";
// import { Row, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../utils/constants';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
// import Parse from 'parse/dist/parse.min.js';
import { useSelector } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import TextField from '@mui/material/TextField';
import InvoiceModal from './InvoiceModal';
import { uid } from 'uid';
import invoiceNumber from '../utils/invoiceToNumber';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const AddToCart = () => {
  const { user } = useSelector((state) => state.auth);
  const [inv_code, setInvoice] = useState("INV0000000");
  const [qty, setQty] = useState(0);
  const [sub_total, setSubTotal] = useState(0);
  const [total_disc, setTotalDiskon] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);
  const [iscard, setIsCard] = useState("M");
  const [note, setNote] = useState("Keterangan");
  const [productId, setProductId] = useState(1);
  const [kodemember, setKodeMember] = useState("KYOSHI");
  const [terapis, setTerapis] = useState("Terapis");
  const [branchId, setBranchId] = useState(1);
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
 
  const [msg, setMsg] = useState("");
  const [members, setMembers] = useState([]); 
  const [productSearch, setProductSearch] = useState("");

  const navigate = useNavigate();
  
  const ref = useRef(null);

  const handleClick = () => {
    console.log(ref.current.value);
  };

  useEffect(() => {
    let newSubTotal = totalHarga;
    setQty(qty);
    newSubTotal = qty * newSubTotal;
    setSubTotal(newSubTotal);
    console.log(sub_total);
  }, [qty, sub_total, totalHarga]);

  const handleInputQtyChange = (event) => {
    setQty(event.target.value);
    console.log(qty); 
  }

  const handleInputSubTotalChange = (event) => {
    let newSubTotal = totalHarga;
    newSubTotal = qty * newSubTotal;
    setSubTotal(newSubTotal);
    console.log(newSubTotal);
  }

  useEffect(() => {
    // let newSubTotal = 0;
    let newTotalHarga = 0;
    let newTotalDiskon = 0;
    // setQty(qty);
    setTotalDiskon(total_disc);
    cart.forEach(icart => {
      newTotalHarga = newTotalHarga + parseInt(icart.totalHarga);
    })
    newTotalDiskon = parseInt(total_disc);
    newTotalHarga = newTotalHarga - newTotalDiskon ;
    // newSubTotal = qty * newTotalHarga;
    setTotalHarga(newTotalHarga);
    // setSubTotal(newSubTotal);
  },[cart, total_disc])

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async() => {
    setIsLoading(true);
    const result = await axios.get(API_URL + 'products');
    setProducts(await result.data);
    setIsLoading(false);
  }

  const fetchMembers = async() => {
    const result = await axios.get(API_URL + 'members');
    setMembers(await result.data);
  }

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setProductId({ ...productId, [name]: value});
    console.log(productId);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log(productId)
  }

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + 'orders', {
        inv_code: inv_code,
        qty: qty,
        sub_total: sub_total,
        total_disc: total_disc,
        taxes: taxes,
        total_price: totalHarga,
        kodemember: kodemember,
        iscard: iscard,
        note: note,
        terapis: terapis,
        productId: productId,
        branchId: branchId,
      });
      navigate("/carts");
      console.log("Data berhasil masuk ke database");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    
  };

  const addProductToCart = async(product) => {
    // Cek jika product sudah ada di keranjang
    let findProductInCart = cart.find(i => {
      return i.id === product.id;
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.id === product.id){
          newItem = {
            ...cartItem,
            qty: cartItem.qty + 1,
            totalHarga: cartItem.price * (cartItem.qty + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
        
      });

      setCart(newCart);
      // console.log(newCart);

    }else{
      let addingProduct = {
        ...product,
        'id': product.id,
        'qty': 1,
        'totalHarga': product.price,
      }
      setCart([...cart, addingProduct]);
    //   toast(`Added ${product.name} to cart`, toastOptions)
     console.log(cart);
    }
   
  }

  const removeProduct = async(product) =>{
    const newCart = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    setInvoice((prevNumber) => invoiceNumber(prevNumber));
    handleReactToPrint();
  }

  const addNextInvoiceHandler = () => {
    setInvoice((prevNumber) => invoiceNumber(prevNumber));
  };

  const filterItems = () => {
    let searchTxt = document.querySelector("[name='filterItems']").value;
    searchTxt = searchTxt.toLowerCase();
    setProductSearch((productSearch) => searchTxt);
  }

  useEffect(() => {
    fetchProducts();    
  }, []);

  useEffect(() => {
    fetchMembers();
  }, []);
  
  

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  

  

  return (
      <div className='grid grid-cols-2 gap-4'> 
        <div>
          <h2 className='subtitle'>Kyoshi Salon Cabang <strong>{user && user.branchId} </strong></h2>
          <h2 className="mt-3">
              <strong>Daftar Jasa dan Layanan</strong>
          </h2>
          <div className="card is-shadowless" style={{width:'35rem', fontSize: '12px'}}>
            <div className="card-content">
              <input style={{ width: '25rem' }} type="text" name="filterItems" placeholder="Cari Jasa Layanan" className="form-control" onChange={() => filterItems()} />
              <div className="content my-0">
                {products.length > 0 ? products.map((product, i) => {
                  let tempName = product.name ? product.name.toLowerCase() : "";
                  return <button type="button" key={i} className={tempName.indexOf(productSearch) !== -1 ? "block w-full cursor-pointer rounded-lg bg-primary-100 p-2 text-left text-primary-600" : "hide"}
                      onClick={() => addProductToCart(product)}>{product.name + " - Rp." + numberWithCommas(product.price)}
                      </button>
                  })
               : null}
              </div>
            </div>
          </div> 

          <div style={{display: "none"}}>
              <ComponentToPrint 
                inv_code={inv_code} 
                branchId={branchId} 
                kodemember={kodemember}
                total_disc={total_disc}
                taxes={taxes}
                cart={cart} 
                totalHarga={totalHarga} 
                note={note}
                ref={componentRef}/>
          </div>
        </div>
        
        <div>
       
            <form 
              className="relative flex flex-col px-2 md:flex-row"
              onSubmit={saveOrder}
            >
              <div>
                  <table className='p-4 text-left' style={{fontSize:'12px'}}>
                    <thead>
                      <tr className="border-b border-gray-900/10 text-sm md:text-base">
                        <td><strong>No.</strong></td>
                        <td><strong>Id</strong></td>
                        <td><strong>Jasa</strong></td>
                        <td><strong>Harga</strong></td>
                        <td><strong>QTY</strong></td>
                        <td><strong>Sub Total</strong></td>
                          {/* <td><strong>Keterangan</strong></td> */}
                          {/* <td>Product Id</td>
                          <td>BranchId</td> */}
                        <td><strong>Action</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                        { cart ? cart.map((cartProduct, key) => 
                          <tr key={key}>
                          {/* {console.log(cartProduct)} */}
                            <td>{key + 1}</td>
                            <td>
                            <input style={{width:"65px"}}
                                type='text'
                                name='productId'
                                value={productId}
                                onChange={e => setProductId(e.target.value)}
                                />
                                 
                            </td>

                            <td>
                              {cartProduct.name}
                            </td>
                            <td>{numberWithCommas(cartProduct.price)}</td>
                            <td>
                              <input style={{width:"65px"}}
                                type='text'
                                name='qty'
                                value={qty}
                                onChange={handleInputQtyChange}
                                placeholder='Jumlah'
                                />
                                
                            </td>
                          <td >
                            <input 
                              type='text'
                              name='sub_total'
                              value={numberWithCommas(sub_total)}
                              onChange={e => setSubTotal(e.target.value)}
                              placeholder='Sub Total'
                              disabled/>
                          </td>
                         
                          {/* <td style={{display: "none"}}>
                            <input 
                              type='text'
                              name='id'
                              value={cartProduct.id}
                              onChange={e => setProductId(e.target.value)}
                              disabled/>
                          </td> */}
                          <td style={{display: "none"}}>
                            <input 
                              type='text'
                              name='branchid'
                              value={cartProduct.user.branchId}
                              onChange={e => setBranchId(e.target.value)}
                              disabled/>
                          </td>
                          <td>
                            <button 
                              className='rounded-md bg-red-400 px-4 py-2 text-sm text-white shadow-sm hover:bg-red-600'
                              onClick={() => removeProduct(cartProduct)}>
                              Remove
                            </button>
                          </td>
                        </tr>)
                        : 'Tidak ada Item pada Transaksi'}
                      </tbody>
                    </table>
                    <div className="card is-shadowless" style={{width:'35rem', fontSize: '12px'}}>
                      <div className="card-content">
                        <div className="content">
                              {/* <label htmlFor="first">Diskon Member</label>
                              <input onChange={onChange} defaultValue={first} name='first' id="first" type="number"/>

                              <label htmlFor="second">Diskon Uang Muka / DP</label>
                              <input onChange={onChange} defaultValue={second} name="second"  id="second" type="number"/> */}

                              <div className="field">
                                <label htmlFor="invoice">Nomor Invoice</label>
                                <div className='control'>
                                  <input style={{ fontSize: '12px' }}
                                    type="text"  
                                    name="invoice" 
                                    placeholder="Nomor Invoice" 
                                    onChange={e => setInvoice(e.target.value)}
                                    value={inv_code}/>
                                </div>
                              </div>
                              <div style={{display: "none"}} className="field">
                                <label htmlFor="taxes"><strong>PPN</strong></label>
                                  <div className='control'> 
                                    <input
                                      type="text" 
                                      name="taxes"
                                      onChange={e => setTaxes(e.target.value)} 
                                      value={taxes} disabled/>
                                  </div>
                              </div>
                              <div className="field">
                                <label htmlFor="terapis">Terapis</label>
                                  <div className='control'>
                                    <input style={{ fontSize: '12px' }}
                                      type="text"  
                                      name="terapis" 
                                      placeholder="Nama Terapis" 
                                      onChange={e => setTerapis(e.target.value)}
                                      value={terapis}/>
                                  </div>
                              </div>
                            
                              
                              {/* <h2 className='px-2'><strong>Total Harga: Rp.{numberWithCommas(totalHarga)}</strong></h2> */}
                          
                                <div className="field">
                                <label htmlFor="kodemember">Customer/Kode Member</label>
                                <div className='control'> 
                                  <input style={{ fontSize: '12px' }}
                                    type="text"  
                                    name="kodemember" 
                                    value={kodemember}
                                    onChange={e => setKodeMember(e.target.value)}
                                    placeholder="Kode Member" />
                                </div>

                                  <label htmlFor="member">Kartu Member/Tidak</label>
                                  <div className='contol'>
                                    <input style={{ fontSize: '12px' }}
                                    type="text"  
                                    name="iscard" 
                                    placeholder="Kartu"
                                    onChange={e => setIsCard(e.target.value)}
                                    value={iscard}/>
                                  </div>

                                  <label htmlFor="diskon">Diskon</label>
                                  <div className='control'>
                                    <input style={{ fontSize: '12px' }}
                                      type="text" 
                                      name="diskon"
                                      onChange={e => setTotalDiskon(e.target.value)} 
                                      value={total_disc}/>
                                  </div>
                                  
                                  <label htmlFor="note">Catatan</label>
                                  <div className='control'>
                                  <input style={{ fontSize: '12px' }}
                                    type="text" 
                                    name='note'
                                    value={note}
                                    onChange={e => setNote(e.target.value)} 
                                    placeholder='Catatan'/>
                                  </div>
                              </div>
                              <div className="field">
                                <label htmlFor="total harga"><strong>Total Harga</strong></label>
                                  <div className='control'> 
                                  <strong>
                                    <input
                                      type="text" 
                                      name="totalharga"
                                      onChange={e => setTotalHarga(e.target.value)} 
                                      value={numberWithCommas(totalHarga)}
                                      disabled/>
                                  </strong>
                                  </div>
                              </div>
                        </div>
                        <div className='mt-3'>
                              { totalHarga !== 0 ? 
                            <div>
                              <button 
                                type='submit' 
                                className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600' 
                               >
                                <span>Simpan</span>
                              </button>
                              {/* onClick={handlePrint} */}
                              <button
                                  onClick={handlePrint}
                                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                                      >
                                  {/* <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                    <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                          />
                                    </svg> */}
                                  <span>Cetak</span>
                                </button>    
                          
                              {/* <button 
                                type='submit' 
                                className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600' 
                                onClick={reviewInvoiceHandler}>
                                Cetak
                              </button> */}
                              <InvoiceModal
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                invoiceInfo={{
                                  branchId,
                                  inv_code,
                                  kodemember,
                                  sub_total,
                                  taxes,
                                  total_disc,
                                  totalHarga,
                                  note,
                                  terapis,
                                }}
                                cart={cart}
                                onAddNextInvoice={addNextInvoiceHandler}
                              />
                            </div> : ''
                                  }
                        </div>
                      </div>             
                    </div>
                    {/* <h2 className='px-2'><strong>Nama Pelanggan: {member.name}</strong></h2> */}
                  </div>
            </form>
        </div> 
      </div> 
  )
}

export default AddToCart
