import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/styles.js'
import axios from 'axios';
import User from '../models/user';
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import ModalComp from './modals/ModalComp';
import AddQuote from './actions/AddQuote';
import Settings from './settings/Settings';

const Nav = () => {
    const location = useLocation()
    const[guest, setGuest] = useState(false);
    const[user, setUser] = useState(new User())
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    function openModalSettings() {
        setSettingsIsOpen(true)  
    }

    function openModalAdd() {
        setAddIsOpen(true) 
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
        <img src='http://localhost:4000/api/uploads/default.png' width="50" />
        <div className="">
            <Link className="login_button_nav" to={`/login`}>Login</Link>
        </div>
    </div>
  )
else if(location.pathname === '/login')
  return (
    <div className="nav" id='root'>
        <img src='http://localhost:4000/api/uploads/default.png' width="50" />
        <div className="button">
          <Link className="register_button_nav" to={`/register`}>Register</Link>
        </div>
    </div>
  )
else{
    if(guest){
        return (
            <div className="nav" id='root'>
                <img src='http://localhost:4000/api/uploads/default.png' width="50" />
                <div className="nav-buttons">
                  <div>
                    <Link className="login_button_nav nav_buttons" to={`/login`}>Login</Link>
                  </div>
                  <div>
                    <Link className="register_button_nav nav_buttons" to={`/register`}>Register</Link>
                  </div>                  
                </div>          
            </div>
          )
    }
    else{
        return (
            <div className="nav" id='root'>
                <img src='http://localhost:4000/api/uploads/default.png' width="50" />
                <div className="button">
                    <Link className="" to="/">
                        Home
                    </Link>

                    <a onClick={openModalSettings}>Settings</a>
                    {/* if state is true, then it render modal component, with the passed component as prop*/}
                    {settingsIsOpen && <ModalComp open={settingsIsOpen} children={<Settings loggedUser={user}/>} stayOpen={setSettingsIsOpen}></ModalComp>}

                    <Link className="" to="/"
                        onClick={logout}>Sign out
                    </Link>
                    <Link to={`/profile`}>
                    <img src={user.image} width="50" />
                    </Link>
                    <a onClick={openModalAdd}>+</a>
                    {/* if state is true, then it render modal component, with the passed component as prop*/}
                    {addIsOpen && <ModalComp open={addIsOpen} children={<AddQuote />} stayOpen={setAddIsOpen}></ModalComp>}
                </div>
            </div>
          )
    }
}

}

export default Nav