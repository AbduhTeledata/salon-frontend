import React, { useState, useRef } from 'react';
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
import InvoiceItem from '../components/InvoiceItem'

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

const InvoiceForm = (props) => {
  const { user } = useSelector((state) => state.auth);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState("INV0000000");
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [branchId, setBranchId] = useState(1);
  const [kodemember, setKodeMember] = useState("KYOSHI");
  const [note, setNote] = useState("Keterangan");
  const [terapis, setTerapis] = useState("Terapis");
  const [productId, setProductId] = useState();
  const [iscard, setIsCard] = useState("M");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState();
  const [msg, setMsg] = useState("");
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
    setProductId(newItem.id)
    // setQty(newItem.qty);
    console.log("newItem QTY:" + newItem.qty);
};

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    setInvoiceNumber((prevNumber) => invoiceToNumber(prevNumber));
    handleReactToPrint();
  }

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => invoiceToNumber(prevNumber));
    setItems([
      {
        id: uid(6),
        name: '',
        qty: 1,
        price: '1.00',
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    // const newItem = {
    //   id: id,
    //   name: name,
    //   qty: qty,
    //   price: price,
    // };

    // setItems([...items, newItem ]);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: '',
        qty: '1',
        price: '1.00',
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
    // setQty(newItems.qty);
    console.log("EditItem QTY:" + newItems.qty);
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + 'orders', {
        inv_code: invoiceNumber,
        qty: qty,
        sub_total: subtotal,
        total_disc: discount,
        taxes: taxRate,
        total_price: total,
        kodemember: customerName,
        iscard: iscard,
        note: note,
        terapis: terapis,
        productId: productId,
        branchId: branchId
      });
      navigate("/invoices");
      console.log("Data berhasil masuk ke database");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;

  return (
    <div>
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={saveOrder}
    >
      <div className="my-2 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <h1 className="text-center text-lg font-bold">KYOSHI BEAUTY - INVOICE</h1>
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 pb-4 md:flex-row md:items-center md:space-y-0">
        
          <div className="flex space-x-2">
            <span className="font-bold">Tanggal: </span>
            <span>{today}</span>
            {/* <span className="font-bold">Jam: </span>
            <span>{time}</span> */}
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
        <div className="grid grid-cols-2 gap-2 pt-2 pb-8">
        <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="operator"
              >
                Operator:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="operator"
                  id="operator"
                  placeholder="Operator"
                  value={user && user.name}
                  onChange={(event) => setCashierName(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Operator.
                </span>
              </div>
          </div>
           <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="customer"
              >
                Customer:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="customer"
                  id="customer"
                  placeholder="Nama Customer"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Customer.
                </span>
              </div>
          </div>
          <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="terapis"
              >
                Terapis:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="terapis"
                  id="terapis"
                  placeholder="Keterangan"
                  value={terapis}
                  onChange={(event) => setTerapis(event.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Terapis.
                </span>
              </div>
          </div>
          <div className="space-y-2">
              <label
                className="text-sm font-bold md:text-base"
                htmlFor="discount"
              >
                Keterangan:
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
        <table className="w-full mt-0 p-2 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
             {/* <th>ID</th> */}
              <th>JASA</th>
              <th>QTY</th>
              <th className="text-center">HARGA</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
              
            ))}
            <>{console.log("Items:" + items)}</>
          </tbody>
        </table>
        {/* <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Tambah Item
        </button> */}
        <AddCart newItem={newItem}/>
        <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>Rp.{subtotal.toFixed(2)}</span>
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
              ({tax || '0'}Rp{taxRate.toFixed(2)}
            </span>
          </div>
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {total % 1 === 0 ? total : total.toFixed(2)}
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
                  min="0"
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
           
          </div>
        </div>
      </div>
    </form>
    {console.log({
        invoiceNumber, 
        qty: qty, 
        subtotal, 
        discount, 
        taxRate, 
        total,
        kodemember: customerName,
        iscard: iscard,
        note: note,
        terapis: terapis,
        productId: productId,
        branchId: branchId})}
    </div>
  );
};

export default InvoiceForm;
