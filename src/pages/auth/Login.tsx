import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      await axios.post('login',
      {
          email,
          password
      });
      setRedirect(true);
    }

    if(redirect){
      return <Navigate to={'/'} />
  }

  return (
    <>
      <Nav />
      <main className="login-page">  
        <form onSubmit={submit} className="register-form">
          <div className='register-text-container'>
            <h1>Welcome <span>back</span></h1>
            <p>Thank you for coing back. Hope you have a good day and inspire others</p>
          </div>    
          <div className='wrapper'></div>
          <div className="one-input ">
            <label>Email</label>      
            <input type="email" className='stretch auth-input' placeholder="name@example.com" required onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="one-input ">
            <label>Password</label>
            <input type="password" placeholder="Password" className='stretch auth-input' required onChange={e => setPassword(e.target.value)}/>               
          </div>
          <button className="login-button stretch pointer" type="submit">Login</button>
        </form>       
        <div className='register-below-form'>
            <p>Don't have an account?</p>
            <Link className='orange' to={'/register'}>Sign up</Link>
        </div>    
      </main>
      <Footer />
    </>

  )
}

export default Login