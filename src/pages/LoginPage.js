import React from 'react'
import Login from '../components/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  return (
    <div>
      <ToastContainer/>
      <Login />
    </div>
  )
}

export default LoginPage
