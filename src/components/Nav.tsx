import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/nav.css'
import axios from 'axios';
import User from '../models/user';
import { Link } from 'react-router-dom'

const Nav = (preops:any) => {
    const location = useLocation()
    const[guest, setGuest] = useState(false);
    const[user, setUser] = useState(new User())

    const logout = async () => {
        await axios.post('logout', {})
        window.location.reload();
      }
  
    useEffect(() => {
      const getUser = async () =>{
        try{
          const {data} = await axios.get('user')
          console.log(data)
  
          setUser(new User(
            data[0].id,
            data[0].first_name,
            data[0].last_name,
            data[0].email,
            data[0].image
            ))
        }
        catch(e){
            console.log('here=')
          setGuest(true);
        }
      }
      getUser();
      console.log(user)
    }, []);

if(location.pathname === '/register')
  return (
    <div className="nav">
        <div className='logo'>Logo</div>
        <div className="button">
            <div className="">
                <Link to={`/login`}>Login</Link>
            </div>
        </div>
    </div>
  )
else if(location.pathname === '/login')
  return (
    <div className="nav">
        <div className='logo'>Logo</div>
        <div className="button">
            <div className="">
                <Link to={`/register`}>Register</Link>
            </div>
        </div>
    </div>
  )
else{
    if(guest){
        return (
            <div className="nav">
                <div className='logo'>Logo</div>
                <div className="button">
                <div className="">
                    <Link to={`/login`}>Login</Link>
                </div>
                <div className="">
                    <Link to={`/register`}>Register</Link>
                </div>
                </div>
            </div>
          )
    }
    else{
        return (
            <div className="nav">
                <div className='logo'>Logo</div>
                <div className="button">
                    <Link className=""to="/">
                        Home
                    </Link>
                    <button>Settings</button>
                    <Link className=""to="/"
                        onClick={logout}>Sign out
                    </Link>
                    <div>{user.image}</div>
                    <button>Add quote</button>
                </div>
            </div>
          )
    }
}

}

export default Nav