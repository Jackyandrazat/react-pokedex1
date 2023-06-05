/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState }  from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault()
        // axios.post("https://reqres.in/api/login", { email, password }) // from api pokeAPi
        axios.post("http://localhost:4000/login", { email, password }) // from myapi
          .then((response) => {
            console.log("token ",response.data.token);
            const token = response.data.token;
            localStorage.setItem("authToken", token);
            localStorage.setItem("idUserLogged", response.data.id);
            window.location.href = "/"
          })
        .catch((error) => {
            toast.warn("Username And Password Invalid ", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 200
              });
            console.log(error);
        });
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url("../img/bg.jpg")` }} >
            <ToastContainer />
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gradient-to-br from-gradient1 from-30% via-gradient5 via-60% to-gradient3 to-75%">
                    <form onSubmit={handleSubmit} method='post'>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" value={email} onChange={handleEmailChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base-100">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={handlePasswordChange} />
                                <label className="label">
                                    <a href="#" className="label-text-alt text-base-100 link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary border-0 bg-thirdColor hover:bg-fourthColor hover:text-neutral-900">Login</button>
                            </div>
                            <p className="mt-10 text-center text-sm text-base-100">
                                Belum Bisa Login ya?{' '}
                                <a href="/register" className="font-semibold leading-6 text-fourthColor hover:text-base-100">
                                    Daftar Dulu sini
                                </a>
                            </p>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
