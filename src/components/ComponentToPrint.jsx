import React from "react";
import { numberWithCommas } from "../utils/utils";
import { useSelector } from "react-redux";
import logo from "../logo.png";

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { user } = useSelector((state) => state.auth);
    const {
        invoiceNumber,
        branchId, 
        customerName,
        discountRate,
        taxRate,
        items,
        total,
        note} = props;
    
    return (
      <div ref={ref} className="p-1 mt-0">
          <div className="my-0 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-0" id="print">
              <h4 className=' mb-0 text-center text-sm font-bold subtitle'>KYOSHI BEAUTY</h4>
              <h4 className="mb-0 text-center text-xs text-gray-900">
                Jalan Paledang No.152F
              </h4>
              <h4 className="mb-0 text-center text-xs text-gray-900">
                BANDUNG-JAWA BARAT
              </h4>
              <h4 className="text-center text-xs text-gray-900">
                 WhatsApp: 081222314411
              </h4>
                <div className="mt-0">
                  <div className="mb-0 grid grid-cols-2">
                    <span className="text-xs font-merchant">No Faktur:</span>
                    <span className="text-xs">{invoiceNumber}</span>
                    <span className="text-xs">Tanggal: </span>
                    <span className="text-xs">{today}</span>
                    <span className="text-xs">Jam: </span>
                    <span className="text-xs">{time}</span>
                    <span className="text-xs">Operator:</span>
                    <span className="text-xs">{user && user.name}</span>
                    <span className="text-xs">Customer:</span>
                    <span className="text-xs">{customerName}</span>
                    <span className="text-xs">Keterangan:</span>
                    <span className="text-xs">{note}</span> 
                  </div>
                  <div className="mt-2">
                    <div className="mb-2 grid grid-cols-2">
                    {items.map((item) => (
                        <tr 
                          className="text-xs"
                          key={item.id}>
                          <td className="w-full">{item.name}</td>
                          <td className="min-w-[50px] text-center">
                            {item.qty}
                          </td>
                          <td className="min-w-[80px] text-right">
                            Rp.{item.price}
                          </td>
                          <td className="min-w-[90px] text-right">
                            Rp.{item.price * item.qty}
                          </td>
                        </tr>
                      ))}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col items-end space-y-2">
                    {/* <div className="flex w-full justify-between border-t border-black/10 pt-2">
                      <span className="font-bold">Subtotal:</span>
                      <span>Rp.{invoiceInfo.sub_total}</span>
                    </div> */}
                    <div className="flex w-full justify-between">
                      <span className="text-xs font-bold">Discount:</span>
                      <span className="text-xs font-bold">Rp.{discountRate}</span>
                    </div>
                    <div className="flex w-full justify-between">
                      <span className="text-xs font-bold">Ppn:</span>
                      <span className="text-xs font-bold">Rp.{taxRate}</span>
                    </div>
                    <div className="flex w-full justify-between border-t border-black/10 py-2">
                      <span className="text-xs">TOTAL:</span>
                      <span className="text-xs">
                        Rp.
                        {total % 1 === 0
                          ? total
                          : total}
                      </span>
                    </div>
                   
                  </div>
                </div>
              </div>
              {/* <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={addNextInvoiceHandler}
                  className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                >
                  <svg
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
                  </svg>
                  <span>Cetak</span>
                </button>
              </div> */}
            </div>
            {/* <h2 className='px-2'>Total Harga: Rp.{totalHarga}</h2> */}
      </div>
    );
});