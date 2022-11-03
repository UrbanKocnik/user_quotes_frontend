import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

function Register() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);


    async function submit(e: SyntheticEvent){
        e.preventDefault();
        const response = await axios.post('register',
        {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            password_confirm: password_confirm,

        })
        setRedirect(true);
        return undefined;
    }

    if(redirect){
        return <Navigate to={'/login'} />
    }
    
  return (
    <>
    <Nav />
        <main className="register-page">        
            <div className='register-text-container'>
                <h1>What is your <span>name?</span></h1>
                <p>Your name will appear on quotes and your public profile</p>
                <img src='http://localhost:4000/api/uploads/default.png' />
            </div>
            <form onSubmit={submit} className="register-form">
                <div className='one-input'>
                    <label>Email</label>
                    <input type="email" className='stretch auth-input' placeholder="name@example.com" required onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="two-input">                
                    <div className="one-input">
                        <label>First name</label>
                        <input placeholder="First name" className='auth-input' required onChange={e => setFirstName(e.target.value)}/>                   
                    </div>
                    <div className="one-input">
                        <label>Last name</label>
                        <input placeholder= "Last name" className='auth-input' required onChange={e => setLastName(e.target.value)}/>
                    </div>                
                </div>


                <div className="one-input ">
                    <label>Password</label>
                    <input type="password" placeholder="Password" className='stretch auth-input' required onChange={e => setPassword(e.target.value)}/>               
                </div>
                <div className="one-input">
                    <label>Confirm password</label>
                    <input type="password" className='stretch auth-input' placeholder="Password confirm" required 
                    onChange={e => setPasswordConfirm(e.target.value)}/>
                </div>
                <button className="register-button stretch pointer" type="submit">Register</button>
                <div className='register-below-form'>
                <p>Already have an account?</p>
                <Link className='orange' to={'/login'}>Sign in</Link>
            </div> 
            </form>
       
        </main>
    <Footer />
    
    </>
  )
}

export default Register