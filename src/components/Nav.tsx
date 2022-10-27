import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/nav.css'
import axios from 'axios';
import User from '../models/user';
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import ModalComp from './ModalComp';
import RandomQuote from './RandomQuote';

const Nav = () => {
    const location = useLocation()
    const[guest, setGuest] = useState(false);
    const[user, setUser] = useState(new User())
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
      setIsOpen(true);      
    }

    Modal.setAppElement('#root');

    const logout = async () => {
        await axios.post('logout', {})
        window.location.reload();
      }
  
    useEffect(() => {
      const getUser = async () =>{
        try{
          const {data} = await axios.get('me')
  
          setUser(new User(
            data[0].id,
            data[0].first_name,
            data[0].last_name,
            data[0].email,
            data[0].image
            ))
        }
        catch(e){
          setGuest(true);
        }
      }
      getUser();
    }, []);

if(location.pathname === '/register')
  return (
    <div className="nav" id='root'>
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
    <div className="nav" id='root'>
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
            <div className="nav" id='root'>
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
            <div className="nav" id='root'>
                <div className='logo'>Logo</div>
                <div className="button">
                    <Link className="" to="/">
                        Home
                    </Link>

                    <a onClick={openModal}>Settings</a>
                    {/* if state is true, then it render modal component, with the passed component as prop*/}
                    {modalIsOpen && <ModalComp open={modalIsOpen} children={<RandomQuote />} stayOpen={setIsOpen}></ModalComp>}

                    <Link className="" to="/"
                        onClick={logout}>Sign out
                    </Link>
                    <Link to={`/profile`}>
                    {user.image}
                    </Link>
                    <button>Add quote</button>
                </div>
            </div>
          )
    }
}

}

export default Nav