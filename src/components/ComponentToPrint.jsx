import React, { useState } from "react";
import { numberWithCommas } from "../utils/utils";
import { useSelector } from "react-redux";
import printJS from "print-js";

// import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';
// import ThermalPrinterEncoder from 'thermal-printer-encoder';
// import logo from "../logo.png";

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const time = date.getHours() + ":" + date.getMinutes();

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { user } = useSelector((state) => state.auth);
    const {
        invoiceNumber,
        customerName,
        discount,
        items,
        total,
        note,
        tunai,
        kembali} = props;
    

    const itemqty = items.reduce((acc, cur) => {
          acc += cur.qty;
          return acc;
    }, 0);

  //   function printTest() {
  //     printJS({
  //       printable: "invprint",
  //       type: "html",
  //       // style: [
  //       //   "body {margin: 0;} h4 {margin:0}"
  //       // ],
  //     });
  //  }

    return (
      // <div ref={ref} className="mt-0 mb-0">
          <div ref={ref} id="invprint">
              <div>
              <h2 className="logo">KYOSHI BEAUTY</h2>
              <h2 className="address">
                {user && user.branch.address}
              </h2>
              <h2 className="address">
                 WhatsApp: {user && user.branch.phone}
              </h2>
              {/* <label className="kiri">==========================</label> */}
              <div className="parent">
                <span className="childkiri">NOMOR</span>
                <span class="childkanan">{invoiceNumber}</span>
              </div>
              <div className="parent">
                <span className="childkiri">Tanggal</span>
                <span class="childkanan">{today}{'-'}{time}</span>
              </div>
              <div className="parent">
                <span className="childkiri">Operator</span>
                <span class="childkanan">{user && user.name}</span>
              </div>
              <div className="parent">
                <span className="childkiri">Customer</span>
                <span class="childkanan">{customerName}</span>
                <label className="childkiri">=========================</label>
              </div>
                <div className="mt-0 border-t border-black/10 py-2">
                  {/* <div className="mb-0 mt-0 w-full grid grid-cols-2 items-end">
                      <div className="mt-0 flex flex-col items-end">
                        <div className="mt-0 mb-0 w-full grid grid-cols-2 justify-between">
                          <span className="kiri">NOMOR</span>
                          <span className="kanan">{invoiceNumber}</span>
                        </div>
                      </div>
                    <span className="kiri">Tanggal </span>
                    <span className="kanan">{today}{'-'}{time}</span>
                    <span className="kiri">Operator</span>
                    <span className="kanan">{user && user.name}</span>
                    <span className="kiri">Customer</span>
                    <span className="kanan">{customerName}</span>
                    <span className="kiri">Keterangan</span>
                    <span className="kanan">{note}</span> 
                    <label className="kiri">==========================</label>
                  </div> */}
                    {items.map((item, index) => (
                        <div
                          className="mt-0 flex flex-col items-end"
                          key={index}>
                          <div> 
                             <span className="kiriitem w-full">{index + 1}.{item.name}</span>
                            <div>
                             <span className="kiri1">{item.qty} jasa x {item.price}</span>
                            </div>
                          </div>
                          <div className="mt-0 mb-0 w-full grid grid-cols-2 justify-between">
                              {/* <span className="kiri">{item.qty} jasa x {item.price}</span> */}
                              <span className="kanan1">{item.price * item.qty}</span>
                          </div>
                        </div>
                      ))}
                      <label className="kiri">==========================</label>
                  <div>
                  <div className="mb-0 mt-0 grid grid-cols-2">
                      <span className="kiri">ITEM:</span>
                      <span className="kanan">{itemqty}</span>
                      <span className="kiri">DISCOUNT:</span>
                      <span className="kanan">{discount}</span>
                      <span className="kiri">TOTAL:</span>
                      <span className="kanan">
                        {numberWithCommas(total) % 1 === 0
                          ? numberWithCommas(total)
                          : numberWithCommas(total)}
                      </span>
                      <label className="kiri">==========================</label>
                  </div>
                    {/* <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-merchant">TUNAI</span>
                      <span className="text-xs font-merchant">{tunai}</span>
                    </div> */}
                    {/* <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">KEMBALI</span>
                      <span className="text-xs font-roboto">{kembali}</span>
                    </div> */}
                   
                        
                   
                    {/* <div className="w-full mt-1 text-center">
                        <button>{printTest}</button>
                    </div> */}
                  </div>
                </div>
             <h2 className="address">TERIMAKASIH</h2>
              </div>
          </div>
      // </div>
    );
});