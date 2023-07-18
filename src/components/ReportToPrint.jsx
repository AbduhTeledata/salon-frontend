import React, { useState, useEffect } from 'react'
import { DateRangePicker } from 'react-date-range';
import { numberWithCommas } from '../utils/utils';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import logo from "../logo.png";


export const ReportToPrint = React.forwardRef((props, ref) => {
    const {orders, totalPrice} = props;

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

  return (
    <div ref={ref} className="p-2">
      <img
         src={logo}
         width="50"
         height="50"
         className="d-inline-block align-top"
         alt="Kyoshi salon logo"
         /> {''}
      <h3 className='inline subtitle'>Kyoshi Beauty</h3>
      <h4 className="px-200 text-sm text-gray-900">
         Jalan Paledang No.152F Cibereum-Bandung Telp/WA: 081222314411
      </h4>
          <table className='min-w-full text-left text-xs dark:border-neutral-500'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      <th scope="col" className="border-r dark:border-neutral-500">No</th>
                      <th scope="col" className="border-r dark:border-neutral-500">Tanggal</th>
                      <th scope="col" className="border-r dark:border-neutral-500">No Invoice</th>
                      <th scope="col" className="border-r dark:border-neutral-500">Customer</th>
                      <th scope="col" className="border-r dark:border-neutral-500 text-center">Nama Jasa</th>
                      <th scope="col" className="border-r dark:border-neutral-500">Sub Harga</th>
                      <th scope="col" className="border-r dark:border-neutral-500">Discount</th>
                      <th scope="col" className="border-r dark:border-neutral-500">Harga</th>
                      <th scope="col" className="border-r dark:border-neutral-500">Terapis</th>
                    </tr>
                  </thead>
                  <tbody>
                  {orders.map((order, index) => {
                    let date = new Date(order["createdAt"]);
                    return(
                    <tr 
                      className="border-b dark:border-neutral-500"
                      key={order.uuid}>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{index + 1}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{date.toLocaleDateString()}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order["inv_code"]}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order.customer}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order.productname}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500 text-right">{order.sub_total}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500 text-right">{order.total_disc}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500 text-right">{order.total_price}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order.terapis}</td>
                     
                    </tr>
                    
                    );
                  })}
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td colSpan='2' className='px-6 py-4 text-sm'>Total</td>
                    <td className='px-6 py-4 text-sm'></td>
                    <td className='px-6 py-4 text-sm'></td>
                    <td colSpan='2' className='px-6 py-4 text-sm'>Sub Harga: {numberWithCommas(subtotal)}</td>
                    <td colSpan='2' className='px-6 py-4 text-sm'>Discount: {numberWithCommas(discount)}</td>
                    <td colSpan='2' className='px-6 py-4 text-sm'>Total: {numberWithCommas(total)}</td>
                  </tr>
                  </tbody>
                  
            </table>
            {/* <div className='col-span-4'>
                    <h4 className='px-20 text-sm text-right'>Total: {numberWithCommas(totalPrice)}</h4>
                   
            </div> */}
            {/* <view>
            {calculatedData.map(item=> <td key={item.id}> {item.total_price} </td>)}
            {console.log(calculatedData)}
            </view> */}
      </div>
  )
});

