import React from 'react';

const InvoiceField = ({ onClickItem, onEditItem, cellData }) => {
  return (
    <input
      className={cellData.className}
      type={cellData.type}
      placeholder={cellData.placeholder}
      min={cellData.min}
      max={cellData.max}
      step={cellData.step}
      name={cellData.name}
      id={cellData.id}
      value={cellData.value}
      onChange={onEditItem}
      onClick={onClickItem}
      required
    />
  );
};

export default InvoiceField;
