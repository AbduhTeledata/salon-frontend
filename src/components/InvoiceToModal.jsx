import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import printJS from "print-js";

const InvoiceToModal = (props) => {
    const {
        invoiceNumber,
        customerName,
        discount,
        items,
        total,
        note,
        tunai,
        kembali} = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function printTest() {
        printJS({
          printable: "invprint",
          type: "html",
          style: [
            "body {margin: 0;} h4 {margin:0}"
          ],
          // targetStyles: ["*"]
        });
      }
    return(
        <>
        <button 
        onClick={handleShow}
        className="block mx-auto m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >
          + Cetak Jasa
      </button>
         <Modal id="ivprint"
           className="invoice-modal px-5"
           show={show}
           onHide={handleClose}
         >
           <Modal.Header className='d-flex justify-content-between'> 
             <Modal.Title>Invoice</Modal.Title>
             <Button
               className="invoice-print-button"
               variant="contained"
               onClick={printTest}
             >
               Print
             </Button>
           </Modal.Header>
           <Modal.Body id="invprint">
             <div className="d-flex flex-column justify-content-center">
               <div className="invoice-heading d-flex flex-column text-center">
                 {/* <img
                   style={{ width: "25%", display: "block", margin: "5px auto" }}
                   src={items.name} //images.MAIN[0].url
                   alt="no data availabel"
                 /> */}
                 {/* <h4 style={{ fontSize: "23px" }} className="pt-3 pb-3">
                   {items.name || "Salon Name"}
                 </h4> */}
                 {/* <span>
                   {orderInfo.salon.basic.location.address +
                     " " +
                     orderInfo.salon.basic.location.city.name +
                     " ," +
                     orderInfo.salon.basic.location.state.name ||
                     "Chattarpur, Delhi-110068"}
                 </span> */}
                 {/* <span>GST Number - 22AAAAA0000A1Z5</span> */}
               </div>
               <Dropdown.Divider />
               {/* <div className="d-flex justify-content-between">
                 <span style={{fontSize:'14px'}}>
                   <b>Invoice No:</b> 123/2021
                 </span>
                 <span style={{fontSize:'14px'}}>
                   <b>Invoice Date:</b>{" "}
                   {moment(orderInfo.basic.confirmed_at.date).format("Do MMM") ||
                     "13 May 2021"}
                 </span>
               </div> */}
               <Dropdown.Divider />
               <Table>
                 <thead>
                   <tr>
                     <th style={{ fontSize: "16px", color:'#000000' }}>#</th>
                     <th style={{ fontSize: "16px", color:'#000000' }}>
                       Item
                     </th>
                     <th style={{ fontSize: "16px", color:'#000000' }}>Price</th>
                   </tr>
                 </thead>
                 <tbody>
                   {/* {items.map((item, i) => {
                     //paddingRight: "250px",
                     return (
                       <tr key={i}>
                         <td style={{color:'#000', fontSize: "16px"}}>{i + 1}</td>
                         <td style={{color:'#000', fontSize: "16px"}}>{item.name}</td>
                         <td style={{color:'#000', fontSize: "16px"}}>{item.price}</td>
                       </tr>
                     );
                   })} */}
                 </tbody>
               </Table>
             </div>
           </Modal.Body>
         </Modal>
         </>
    )
}
export default InvoiceToModal;