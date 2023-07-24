import React, { useState, useRef, useEffect } from 'react';
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
import printJS from "print-js";
import PropTypes from "prop-types";
import InvoiceToModal from './InvoiceToModal';

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
  const [tax, setTax] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState("INV00000001");
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [branchId, setBranchId] = useState('');
  const [kodemember, setKodeMember] = useState('');
  const [note, setNote] = useState('');
  const [terapis, setTerapis] = useState('');
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  // const [productQty, setProductQty] = useState(props.qty);
  // const [productPrice, setProductPrice] = useState(props.price);
  const [iscard, setIsCard] = useState("M");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState('');
  
  const [tunai, setTunai] = useState('');
  const [msg, setMsg] = useState("");
  const [items, setItems] = useState([]);
  const [newdiscount, setNewDiscount] = useState(0);

  // const [kembali, setKembali] = useState('');
  // const [total, setTotal] = useState('');
  // const [subtotal, setSubTotal] = useState('');
  // const [total,setTotal]=useState('');
  
  useEffect(() => {
    console.log('newItems', items);
    console.log('discount', discount);
    console.log('items length', items.length);
    console.log('newdiscount', newdiscount);
    if (discount > 0  && items.length > 0) {
      let  newdiscount = 0;
      setNewDiscount( newdiscount = discount/items.length);
    };
    // setDiscount(discount);
  });

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + 'orders', {
        inv_code: invoiceNumber,
        productname: productName,
        qty: qty,
        sub_total: newsubtotal,
        total_disc: discount,
        taxes: tax,
        total_price: newtotal,
        customer: customerName,
        iscard: iscard,
        note: note,
        terapis: terapis,
        branchId: user && user.branchId
      });
      navigate("/invoices");
      console.log("Data berhasil masuk ke database");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
    
  };

  function newItem(name, qty, price){
    const newItem = {
        id: uuidv4(),
        name: name,
        qty: qty,
        price: price,
    }
    setItems([...items, newItem])
    // setProductId(newItem.id)
    setQty(newItem.qty);
    // setProductId(newItem.id);
    setProductName(newItem.name);
    // setQty(newItem.qty)
    console.log("New Item", newItem) //1. ada
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
  
    const newQty = items.map((item) => {
      for (const key in item) {
        if (key === editedItem.name && editedItem.id === item.id) {
          item[key] = editedItem.value;
        }
      }
    // return item.qty;
    });
    setQty(newQty);
    setItems(newItems);
    // setQty(newItems.qty);
    // setProductName(newItems.name);
    console.log("edit newitems:", newItems);
  };

  function printTest() {
    printJS({
      printable: 'invprint',
      type: 'html',
      css: './src/PrintStruk.css'
    });
    setDiscount(0);
    setQty('');
    setItems([]);
  }
  const componentRef = useRef(null);
  const handleReactToPrint = useReactToPrint({
    pageStyle: "@page { size: 2.5in 4in }",
    content: () => componentRef.current,
    copyStyles: "false",
  });
  
  const handlePrint = () => {
    setInvoiceNumber((prevNumber) => invoiceToNumber(prevNumber));
    setDiscount(0);
    setQty('');
    setItems([]);
    handleReactToPrint();
    // openWindow(() => handleReactToPrint());
  }
 
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };


  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const total = subtotal - discount;
 
  const kembali = tunai - total;

  const newsubtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev = Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const newtotal = newsubtotal - discount;

  const subdiscount = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);

  const values_discount = (e) => {
    let name= e.target.name;
    let value= e.target.value;
    const newValues = {
      ...values, [name]: value
    }
    setDiscount(newValues);
    console.log(newValues);
  }
  const itemqty = items.reduce((acc, cur) => {
    acc += cur.qty;
    return acc;
  }, 0);
  // const taxRate = (tax * subtotal) / 100;
  // const discountRate = (discount * subtotal) / 100;
const [values, set_values] = useState({
    tunai:'',
    kembali:'',
    total:total,
    discount: '',
})
const values_handler = (e) => {
    let name= e.target.name;
    let value= e.target.value;
    const newValues = {
      ...values, [name]: value
    }
    set_values(newValues);
    setTunai(newValues);

    // Calling the method to sum the value
    // calc_total(newValues) 
    console.log(newValues)
}

const [newKembali,setNewKembali] = useState(0);

// const calc_total = (newValues) => {
//     let {tunai, discount} = newValues;
//     newKembali = parseInt(tunai) - parseInt(discount);
//     setNewKembali(newKembali)
// }
 
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
          <div  className="flex items-center space-x-2">
            <label  className="font-bold" htmlFor="invoiceNumber">
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
                  required
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="customer"
                  id="customer"
                  placeholder="Customer"
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
                  required
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="terapis"
                  id="terapis"
                  placeholder="Terapis"
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
                htmlFor="not"
              >
                Keterangan:
              </label>
              <div className="flex items-center">
                <input
                  required
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
              {/* <th className="text-center">NOTE</th> */}
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
                note={item.note}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
              
            ))}
           {/* {console.log("Items:" + items.id)} */}
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
          {/* <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Item:</span>
            <span>{itemqty}</span>
          </div> */}
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>{numberWithCommas(subtotal)}</span>
          </div>
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Discount:</span>
            <span>
              {numberWithCommas(discount)}
            </span>
          </div>
          {/* <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Tax & Service:</span>
            <span>
              ({tax || '0'}Rp{taxRate.toFixed(2)}
            </span>
          </div> */}
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              {numberWithCommas(total) % 1 === 0 ? numberWithCommas(total) : numberWithCommas(total)}
            </span>
          </div>
          {/* <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Kembali:</span>
            <span>
              {numberWithCommas(kembali)}
            </span>
          </div> */}
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
              onClick={printTest}
              className="w-full block m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
               >
            Cetak 
          </button>
          {/* <InvoiceToModal /> */}
          {/* onClick={printTest} */}
          <div style={{display: "none"}}>
              <ComponentToPrint 
                invoiceNumber={invoiceNumber} 
                customerName={customerName}
                discount={discount}
                items={items} 
                total={total} 
                note={note}
                tunai={tunai}
                kembali={kembali}
                ref={componentRef}/>
          </div>
          <div className="space-y-4 py-2">
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
                  name="discount"
                  id="discount"
                  placeholder="0"
                  value={discount}
                  onChange={(event) => {setDiscount(event.target.value)}}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Rp.
                </span>
              </div>
            </div> 
            <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="tunai">
                Tunai:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="tunai"
                  id="tunai"
                  placeholder="0"
                  value={tunai}
                  onChange={(e) => setTunai(e.target.value)}
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Rp.
                </span>
              </div>
            </div>
            {/* <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="kembali">
                Kembali:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="kembali"
                  id="kembali"
                  placeholder="0"
                  defaultValue="0"
                  // value={numberWithCommas(kembali)}
                  onChange={values_handler}
                  disabled
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Rp.
                </span>
              </div>
            </div> */}
            {/* <div className="space-y-2">
              <label className="text-sm font-bold md:text-base" htmlFor="total">
                Total:
              </label>
              <div className="flex items-center">
                <input
                  className="w-full rounded-r-none bg-white shadow-sm"
                  type="text"
                  name="total"
                  id="total"
                  placeholder="0"
                  // value={numberWithCommas(total)}
                  onChange={values_handler}
                  disabled
                />
                <span className="rounded-r-md bg-gray-200 py-2 px-4 text-gray-500 shadow-sm">
                  Rp.
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </form>
    {console.log("saveOrder",{
       inv_code: invoiceNumber,
       productname: productName,
       qty: qty,
       sub_total: newsubtotal,
       total_disc: discount,
       taxes: tax,
       total_price: newtotal,
       customer: customerName,
       iscard: iscard,
       note: note,
       terapis: terapis,
       branchId: user && user.branchId})}
    </div>
  );
};

export default InvoiceForm;
