import React, {useState, useRef, useEffect} from 'react'
import { useSelector } from "react-redux";
import AddCart from './AddCart';
import EditItem from './EditItem';
import CartItem from './CartItem';
import {v4 as uuidv4} from 'uuid'
import { ComponentToPrint } from './ComponentToPrint';
import invoiceToNumber from '../utils/invoiceToNumber';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const TransaksiJasa = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState("INV0000000");
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [branchId, setBranchId] = useState(1);
  const [kodemember, setKodeMember] = useState("KYOSHI");
  const [note, setNote] = useState("Keterangan");
  const [terapis, setTerapis] = useState("Terapis");
  const [productId, setProductId] = useState(1);
  const [iscard, setIsCard] = useState("M");
  const [msg, setMsg] = useState("");
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState(1);
  
  const [items, setItems] = useState([]);

  function updateItem(id, newName, newQty, newPrice){
        const updateItem = items.map((item) => {
            if(id == item.id){
                return {...item, name: newName, newQty: newQty, newPrice: newPrice };
            }
            return item;
        });
        setItems(updateItem);
  };

  function newItem(name, qty, price){
        const newItem = {
            id: uuidv4(),
            name: name,
            qty: qty,
            price: price,
        }
        setItems([...items, newItem])
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };
  
  const editItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };
    setQty(event.target.value);
    console.log(qty);
  }
  
  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    setInvoiceNumber((prevNumber) => invoiceToNumber(prevNumber));
    handleReactToPrint();
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + 'orders', {
        inv_code: invoiceNumber,
        qty: items.qty,
        sub_total: subtotal,
        total_disc: discount,
        taxes: taxRate,
        total_price: total,
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

    const subtotal = items.reduce((prev, curr) => {
      if (curr.name.trim().length > 0)
        return prev + Number(curr.price * Math.floor(qty));
      else return prev;
    }, 0);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;

    const showCarts = true;


  return (
   <form 
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={saveOrder}
      >
         
      <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Tanggal: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Nomor Invoice:
            </label>
            <input
              required
              className="max-w-[130px]"
              type="text"
              name="invoiceNumber"
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
              disabled
            />
          </div>
        </div>
        {/* <h1 className="text-center text-lg font-bold">INVOICE</h1> */}
        <div className="grid grid-cols-2 gap-2 pt-4 pb-8">
          <label
            htmlFor="cashierName"
            className="text-sm font-bold sm:text-base"
          >
            Operator:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Operator"
            type="text"
            name="cashierName"
            id="cashierName"
            value={user && user.name}
            onChange={(event) => setCashierName(event.target.value)}
          />
          <label
            htmlFor="customerName"
            className="col-start-2 row-start-1 text-sm font-bold md:text-base"
          >
            Customer:
          </label>
          <input
            required
            className="flex-1"
            placeholder="Customer"
            type="text"
            name="customerName"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </div>
        <table className="flex flex-col p-4 text-left">
          {/* <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>JASA</th>
              <th className='text-left'>QTY</th>
              <th className='text-left'>HARGA</th>
              <th className='text-left'>ACTION</th>
            </tr>
          </thead> */}
          <tbody>
          {showCarts ? (
            <div className='flex flex-col flex-wrap justify-center'>
                {items.map((item) => {
                    const editItem = (
                        <EditItem 
                            id={item.id}
                            name={item.name} 
                            qty={item.qty}
                            price={item.price}
                            updateItem={updateItem}/>
                    );
                    return (
                        <div>
                        <CartItem 
                            key={item.id}
                            id={item.id}
                            name={item.name} 
                            qty={qty}
                            price={item.price} 
                            onEditItem={editItemHandler}
                            onDeleteItem={deleteItemHandler}
                        />
                        </div>
                       
                    );
                })}
           
            <AddCart newItem={newItem}/>
            </div>
        ) : (
            <p>'You cannot see cart'</p>
        )}
          </tbody>
        </table> 
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>Rp.{numberWithCommas(subtotal.toFixed(2))}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              ({discount || '0'})Rp.{discountRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax & Service:</span>
            <span>
              ({tax || '0'})Rp{taxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {total % 1 === 0 ? numberWithCommas(total) : numberWithCommas(total.toFixed(2))}
            </span>
          </div>
        </div>
      </div>
      <div className="basis-1/4 bg-transparent">
        <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pt-6 md:pl-4">
          <button
            className="w-full block m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Simpan
          </button>
          <button
              onClick={handlePrint}
              className="w-full block m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
               >
            Cetak 
          </button>
          <div style={{display: "none"}}>
              <ComponentToPrint 
                invoiceNumber={invoiceNumber} 
                branchId={branchId} 
                customerName={customerName}
                discountRate={discountRate}
                taxRate={taxRate}
                items={items} 
                total={total} 
                note={note}
                ref={componentRef}/>
          </div>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tax">
                Tax & Service:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Rp.
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Discount:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="number"
                  name="discount"
                  id="discount"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Rp.
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Discount:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="note"
                  id="note"
                  placeholder="Keterangan"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Note.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
   </form>
  )
}

export default TransaksiJasa