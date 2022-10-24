import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Nav from '../../components/Nav';

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
    <main className="form-signin w-100 m-auto">
        <Nav />
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <input className="form-control"placeholder="First name" required onChange={e => setFirstName(e.target.value)}/>
            <input className="form-control"placeholder= "Last name" required onChange={e => setLastName(e.target.value)}/>
            <input type="email" className="form-control"placeholder="name@example.com" required onChange={e => setEmail(e.target.value)}/>

            <input type="password" className="form-control" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
            <input type="password" className="form-control" placeholder="Password confirm" required 
            onChange={e => setPasswordConfirm(e.target.value)}/>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        </form>
    </main>
  )
}

export default Register