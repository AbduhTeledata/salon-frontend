import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Layout from './Layout';
import InvoiceForm from '../components/InvoiceForm';
// import AddToCart from '../components/AddToCart';
// import Navbar from '../components/Navbar';

const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, user, navigate]);

  return (
      <div>
        <Layout>
          <InvoiceForm />
        </Layout>  
      </div>
  )
}

export default Invoices
