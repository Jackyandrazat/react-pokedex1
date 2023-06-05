/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/users', {
        email: email,
        password: password
      });
      console.log(response); // Menampilkan respons dari server\
      localStorage.setItem('authToken', true);
      window.alert("Register Berhasil", response);
      setIsRegistered(true);
    }
     catch (error) {
      console.log(error);
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url("../img/bg.jpg")` }} >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register Account</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gradient-to-br from-gradient1 from-30% via-gradient5 via-60% to-gradient3 to-75%">
            <div className="card-body">
              <h1 className='text-center font-bold text-base-100'>Register Account</h1>
              <form onSubmit={handleSubmit}>
                {/* <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-100">Username</span>
                  </label>
                  <input type="text" placeholder="Username" className="input input-bordered" value={username} onChange={e => setUsername(e.target.value)} />
                </div> */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-100">Email</span>
                  </label>
                  <input type="email" placeholder="email" className="input input-bordered" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-100">Password</span>
                  </label>
                  <input type="password" placeholder="password" className="input input-bordered" value={password} onChange={e => setPassword(e.target.value)} />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover text-base-100">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary border-0 bg-thirdColor hover:bg-fourthColor hover:text-neutral-900" type="submit">Daftar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
