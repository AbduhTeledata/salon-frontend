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

    function printTest() {
      printJS({
        printable: "invprint",
        type: "html",
        // style: [
        //   "body {margin: 0;} h4 {margin:0}"
        // ],
      });
   }

    return (
      // <div ref={ref} className="mt-0 mb-0">
          <div ref={ref} className="my-0" id="invprint">
              <div>
              <h2>KYOSHI BEAUTY</h2>
              <h2 className="mb-0 font-merchant">
                {user && user.branch.address}
              </h2>
              <h2 className="mb-0 font-merchant">
                 WhatsApp: {user && user.branch.phone}
              </h2>
                <div className="mt-0 border-t border-black/10 py-2">
                  <div className="mb-0 mt-0 grid grid-cols-2">
                    <span className="mt-0 font-merchant">NOMOR</span>
                    <span className="font-merchant text-right">{invoiceNumber}</span>
                    <span className="font-merchant">Tanggal: </span>
                    <span className="font-merchant text-right">{today}{'-'}{time}</span>
                    <span className="font-merchant">Operator:</span>
                    <span className="font-merchant text-right">{user && user.name}</span>
                    <span className="font-merchant">Customer:</span>
                    <span className="font-merchant text-right">{customerName}</span>
                    <span className="font-merchant">Keterangan:</span>
                    <span className="font-merchant text-right">{note}</span> 
                  </div>
                    {items.map((item) => (
                        <div
                          className="mt-0 flex flex-col items-end"
                          key={item.id}>
                          <div className="mt-0 mb-0 w-full"> 
                            <span className="text-xs font-merchant">{item.name}</span>
                          </div>
                            <div className="mt-0 mb-0 w-full grid grid-cols-2 justify-between">
                              <span className="text-left text-xs font-merchant">{item.qty} jasa x {item.price}</span>
                              <span className="text-right text-xs">{item.price * item.qty}</span>
                            </div>
                        </div>
                      ))}
                  <div className="mt-0 flex flex-col items-end border-t border-black/10 py-2">
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-merchant">ITEM:</span>
                      <span className="text-xs font-merchant">{itemqty}</span>
                    </div>
                    {/* <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">DISCOUNT:</span>
                      <span className="text-xs font-roboto">{discount}</span>
                    </div> */}
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-merchant">TOTAL:</span>
                      <span className="text-xs font-merchant">
                        {numberWithCommas(total) % 1 === 0
                          ? numberWithCommas(total)
                          : numberWithCommas(total)}
                      </span>
                    </div>
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-merchant">TUNAI</span>
                      <span className="text-xs font-merchant">{tunai}</span>
                    </div>
                    {/* <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">KEMBALI</span>
                      <span className="text-xs font-roboto">{kembali}</span>
                    </div> */}
                    <div className="w-full mt-1 text-center">
                        <h4 className="mt-1 text-center">TERIMAKASIH</h4>
                    </div>
                    <div className="w-full mt-1 text-center">
                        <button>{printTest}</button>
                    </div>
                  </div>
                </div>
                
              </div>
          </div>
      // </div>
    );
});