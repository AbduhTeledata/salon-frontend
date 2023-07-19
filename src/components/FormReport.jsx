import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants';
import { useSelector } from "react-redux";
import { DateRangePicker } from 'react-date-range';
import { numberWithCommas } from '../utils/utils';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { useReactToPrint } from 'react-to-print';
import { ReportToPrint } from './ReportToPrint';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
// import ReactTable from "react-table";


const moment = extendMoment(originalMoment);

const date = new Date();
const today = date.toLocaleDateString('en-ID', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const FormReport = () => {
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [startDate,setStartDate]= useState(new Date());
    const [endDate,setEndDate]= useState(new Date());
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderToPrint, setOrderToPrint] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectDate, setSelectDate] = useState();

    const today = moment();
    // this.state = {
    //   isOpen: false,
    //   value: moment.range(today.clone().subtract(7, "days"), today.clone())
    // };

    const onSelect = () => {
      setSelectDate(moment.range(today.clone().subtract(7, "days"), today.clone()));
    };
  
    const onToggle = () => {
      setIsOpen(!isOpen );
    };


    const subtotal = orders.reduce((acc, cur) => {
      acc += cur.sub_total;
      return acc;
    }, 0);

    const discount = orders.reduce((acc, cur) => {
      acc += cur.total_disc;
      return acc;
    }, 0);

    const total = orders.reduce((acc, cur) => {
      acc += cur.total_price;
      return acc;
    }, 0);


    
    const fetchOrder = async() => {
      const result = await axios.get(API_URL + 'orders');
      setOrders(await result.data);
      setAllOrders(await result.data);
      console.log(result);
    }

    const handleSelect = (date) =>{
      let filtered = allOrders.filter((order)=>{
      let orderDate = new Date(order["createdAt"]);
        return(orderDate>= date.selection.startDate &&
          orderDate<= date.selection.endDate);
      })
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
        setOrders(filtered);
    };
  
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }

    useEffect(() => {
      fetchOrder();  
      // getTotals(); 
    }, []);

    useEffect(() => {
      let newTotalPrice = 0;
      orders.forEach(order => {
        newTotalPrice = newTotalPrice + parseInt(order.total_price);
      })
      setTotalPrice(newTotalPrice);   
    },[orders]);

    const componentRef = useRef();

    const handleReactToPrint = useReactToPrint({
     content: () => componentRef.current,
    });

    const handlePrint = () => {
      handleReactToPrint();
    }

  return (
    <div className='flex flex-col'>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
           <h2 className="subtitle">Kyoshi Beauty</h2>
           {/* <h2 className="subtitle">Laporan <strong>{user && user.branchId}</strong></h2> */}
      {/* <div>{renderSelectionValue()}</div> */}
        <div className="grid grid-cols-2 gap-2 pt-2 pb-8">
          <input className="block m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            value="Tanggal"
            onClick={onToggle}
          />
           <button
              onClick={handlePrint}
              className="block m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
               >
            Cetak Laporan
          </button>
        </div>

        {isOpen && (
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            onSelect={onSelect}
            singleDateRange={true}
          />
        )}
      {/* <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      /> */}
      
        <div style={{display: "none"}}>
              <ReportToPrint 
                Date={date.toLocaleDateString()}
                totalPrice={totalPrice}
                orders={orders}
                ref={componentRef}/>
          </div>
          {/* invoiceNumber={order.inv_code} 
                kodemember={order.kodemember}
                productName={order.product.name}
                subtotal={order.sub_total}
                discount={order.total_disc}
                total={order.total_price} 
                terapis={order.terapis} */}
      {/* <h4>Periode{handleSelect}</h4> */}
      <table className='min-w-full text-left text-sm font-light'>
        <thead className='border-b font-bold dark:border-neutral-500'>
          <tr>
            <th scope="col" className="px-4 py-2">No</th>
            <th scope="col" className="px-4 py-2">Tanggal</th>
            <th scope="col" className="px-4 py-2">No Invoice</th>
            <th scope="col" className="px-4 py-2">Customer</th>
            <th scope="col" className="px-4 py-2 text-center">Jasa</th>
            <th scope="col" className="px-4 py-2">Qty</th>
            <th scope="col" className="px-4 py-2">Sub Harga</th>
            <th scope="col" className="px-4 py-3">Discount</th>
            <th scope="col" className="px-4 py-2">Harga</th>
            <th scope="col" className="px-4 py-2">Terapis</th>
            <th scope="col" className="px-4 py-2">Kasir</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            let date = new Date(order["createdAt"]);
            // let subtotal = 0;
            // order.forEach(item => {
            //   order += item[key].sub_total;
            // });
            return(
            <>
            <tr 
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              key={order.uuid} >
                <td className="whitespace-nowrap px-4 py-2 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-4 py-2">{date.toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-4 py-2">{order["inv_code"]}</td>
                <td className="whitespace-nowrap px-4 py-2">{order.customer}</td>
                <td className="whitespace-nowrap w-full px-4 py-2">{order.productname}</td>
                <td className="whitespace-nowrap px-4 py-2">{order.qty}</td>
                <td className="whitespace-nowrap  px-4 py-2 text-right">{numberWithCommas(order.sub_total)}</td>
                <td className="whitespace-nowrap px-4 py-2 text-right">{numberWithCommas(order.total_disc)}</td>
                <td className="whitespace-nowrap px-4 py-2 text-right">{numberWithCommas(order.total_price)}</td>
                <td className="whitespace-nowrap px-4 py-2 text-left">{order.terapis}</td>
                <td className="whitespace-nowrap px-4 py-2">{order.user.name}</td> 
              </tr>
            </>
            );
          })}
          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td colSpan='2' className='px-6 py-4 text-xl'>Total</td>
            <td className='px-6 py-4 text-xl'></td>
            <td className='px-6 py-4 text-xl'></td>
            <td colSpan='2' className='px-6 py-4 text-xl'>Sub Harga: {numberWithCommas(subtotal)}</td>
            <td colSpan='2' className='px-6 py-4 text-xl'>Discount: {numberWithCommas(discount)}</td>
            <td colSpan='2' className='px-6 py-4 text-xl'>Total: {numberWithCommas(total)}</td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>
      </div>
     </div>
  )
}

export default FormReport
