import React from 'react';
// import NavbarComponent from '../components/NavbarComponent';
// import Sidebar from '../components/Sidebar';
// import { Container, Row, Col} from 'react-bootstrap';
// import Navbar from '../components/Navbar'
import NavbarComponent from '../components/NavbarComponent'
import Sidenav from '../components/Sidenav';


const Layout = ({ children }) => {
  return (
    <div>
      <NavbarComponent />
      <div className='grid grid-cols-5 gap-4'>
            <div className='flex rounded-lg'>
                <Sidenav />
            </div>
            <div className='col-span-4 mr-0 mt-2 flex w-full'>
                <main>{children}</main>
            </div>
      </div>
    </div>
  )
}

export default Layout;
