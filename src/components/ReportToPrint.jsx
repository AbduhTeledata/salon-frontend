import React from 'react'
import { DateRangePicker } from 'react-date-range';
import { numberWithCommas } from '../utils/utils';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import logo from "../logo.png";

export const ReportToPrint = React.forwardRef((props, ref) => {
    const {orders, totalPrice} = props;
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
          <table className='min-w-full text-left text-sm dark:border-neutral-500'>
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
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order.kodemember}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order.product.name}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500 text-right">{numberWithCommas(order.sub_total)}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500 text-right">{numberWithCommas(order.total_disc)}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500 text-right">{numberWithCommas(order.total_price)}</td>
                      <td className="whitespace-nowrap border-r dark:border-neutral-500">{order.terapis}</td>
                      
                    </tr>
                    );
                  })}
                  </tbody>
            </table>
            <h2 className='px-20 text-xl text-right'>Total Harga: Rp.{numberWithCommas(totalPrice)}</h2>
      </div>
  )
});

