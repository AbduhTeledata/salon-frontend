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

const time = date.getHours() + ":" + date.getMinutes();

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { user } = useSelector((state) => state.auth);
    const {
        invoiceNumber,
        customerName,
        items,
        total,
        note,
        tunai,
        kembali} = props;
    
    return (
      // <div ref={ref} className="mt-0 mb-0">
          <div ref={ref} className="my-0 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-0" id="print">
              <h4 className=' mb-0 text-center text-sm font-bold font-roboto subtitle'>KYOSHI BEAUTY</h4>
              <h4 className="mb-0 text-center text-xs font-roboto">
                {user && user.branch.address}
              </h4>
              <h4 className="mb-0 text-center text-xs font-roboto">
                 WhatsApp: {user && user.branch.phone}
              </h4>
                <div className="mt-0 border-t border-black/10 py-2">
                  <div className="mb-0 mt-0 grid grid-cols-2">
                    <span className="text-xs mt-0 font-roboto">NOMOR</span>
                    <span className="text-xs font-roboto text-right">{invoiceNumber}</span>
                    <span className="text-xs font-roboto ">Tanggal: </span>
                    <span className="text-xs font-roboto text-right">{today}{'-'}{time}</span>
                    <span className="text-xs font-roboto">Operator:</span>
                    <span className="text-xs font-roboto text-right">{user && user.name}</span>
                    <span className="text-xs font-roboto ">Customer:</span>
                    <span className="text-xs font-roboto text-right">{customerName}</span>
                    <span className="text-xs font-roboto">Keterangan:</span>
                    <span className="text-xs font-roboto text-right">{note}</span> 
                  </div>
                  {/* <div className="mt-2"> */}
                    {/* <div  className="mt-2 flex flex-col items-end space-y-2"> */}
                    {items.map((item) => (
                        <tr 
                          className="text-xs border-t border-black/10 py-2"
                          key={item.id}>
                          <div className="mt-1 w-full"> 
                            <span className="text-xs font-roboto">{item.name}</span>
                          </div>
                          {/* <div className="mt-2 flex flex-col items-end space-y-1"> */}
                            <div className="mt-0 w-full grid grid-cols-2 justify-between">
                              <span className="text-left text-xs font-roboto">{item.qty} jasa x {numberWithCommas(item.price)}</span>
                              <span className="text-right text-xs font-roboto">{numberWithCommas(item.price * item.qty)}</span>
                            </div>
                            {/* <div className="flex w-full justify-between">
                              <span className="text-xs font-roboto">ITEM</span>
                              <span className="text-xs font-roboto">{item.qty}</span>
                            </div> */}
                          {/* </div> */}
                        </tr>
                      ))}
                    {/* </div> */}
                  {/* </div> */}
                  <div className="mt-0 flex flex-col items-end border-t border-black/10 py-2">
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">ITEM:</span>
                      <span className="text-xs font-roboto">{items.qty}</span>
                    </div>
                    {/* <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">DISCOUNT:</span>
                      <span className="text-xs font-roboto">{discountRate}</span>
                    </div> */}
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">TOTAL:</span>
                      <span className="text-xs font-roboto">
                        {numberWithCommas(total) % 1 === 0
                          ? numberWithCommas(total)
                          : numberWithCommas(total)}
                      </span>
                    </div>
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">TUNAI</span>
                      <span className="text-xs font-roboto">{tunai}</span>
                    </div>
                    <div className="flex w-full mt-0 justify-between">
                      <span className="text-xs font-roboto">KEMBALI</span>
                      <span className="text-xs font-roboto">{kembali}</span>
                    </div>
                    <div className="flex w-full mt-2 justify-between">
                      <span className="mb-0 text-xs font-roboto text-center">TERIMAKASIH</span>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      // </div>
    );
});