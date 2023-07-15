import React from 'react'
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className='title'>Dashboard</h1>
      <h5 className='subtitle'>Selamat Datang: <strong>{user && user.name} </strong></h5>
      <h5 className='subtitle'>Kyoshi Beauty: <strong>{user && user.branch.name} </strong></h5>
      <h5 className='subtitle'>Alamat: <strong>{user && user.branch.address} </strong></h5>
      <h5 className='subtitle'>Telp/WA: <strong>{user && user.branch.phone} </strong></h5>
    </div>
  )
}

export default Welcome
