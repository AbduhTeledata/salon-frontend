import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
// import Orders from './pages/Orders';
import Carts from './pages/Carts';
import LandingPage from './pages/LandingPage';
import Reports from './pages/Reports';
import Invoices from './pages/Invoices';
import Employees from './pages/Employees';
import Transaksi from './pages/Transaksi';
import Example from './components/InvoiceToPrint';
// import './index.css'
// import './App.css'

function App() {
  return (
    <div>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path='/' element={<LandingPage />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/dashboard' element={<Dashboard />}/>
              <Route path='/users' element={<Users />}/>
              <Route path='/users/add' element={<AddUser />}/>
              <Route path='/users/edit/:id' element={<EditUser />}/>
              <Route path='/products' element={<Products />}/>
              <Route path='/products/add' element={<AddProduct />}/>
              <Route path='/products/edit/:id' element={<EditProduct />}/>
              {/* <Route path='/orders' element={<Orders />}/> */}
              <Route path='/carts' element={<Carts />}/>
              <Route path='/reports' element={<Reports />}/>
              <Route path='/invoices' element={<Invoices />}/>
              <Route path='/employees' element={<Employees />}/>
              <Route path='/transaksi' element={<Example />}/>
            </Routes>
          </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
