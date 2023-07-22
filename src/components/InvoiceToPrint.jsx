import React, { useState, useRef } from 'react'
import ReactToPrint from 'react-to-print';
import PropTypes from "prop-types";
import { PrintContextConsumer } from 'react-to-print';

class InvoiceToPrint extends React.Component {
  render() {
    return (
      <table className='font-Roboto'>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

  class Example extends React.Component {
  render() {
    return (
      <div>
       <ReactToPrint content={() => this.componentRef}>
          <PrintContextConsumer>
            {({ handlePrint }) => (
              <button onClick={handlePrint}>Print this out!</button>
            )}
          </PrintContextConsumer>
        </ReactToPrint>
        <InvoiceToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default Example;

