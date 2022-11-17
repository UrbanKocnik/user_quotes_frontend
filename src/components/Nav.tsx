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
import { Icon } from '@iconify/react';

const Nav = () => {
    const location = useLocation()
    const[guest, setGuest] = useState(false);
    const[user, setUser] = useState(new User())
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    function openModalSettings() {
        setMenuOpen(false)
        setSettingsIsOpen(true)  
    }

    function openModalAdd() {
        setAddIsOpen(true) 
    }

    function openMenu() {
      setMenuOpen(true) 
  }

  function closeMenu() {
    setMenuOpen(false) 
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
    <div className="nav">
      <div className="desktop" id='root'>
      <Link to={`/`}>
        <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
      </Link>
      <Link className="login_button_nav" to={`/login`}>Login</Link>                
      </div> 
      <div className="mobile" id='root'>
        <Icon icon="carbon:menu" className="pointer orange" onClick={openMenu}  width={30}/>

        <Link to={`/`}>
          <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
        </Link>

        </div>

        <div className={`side-menu ${menuOpen ? "open" : ""}`}>
          <Icon icon="carbon:close" className="pointer" onClick={closeMenu} width={30}/>
          <div className="side-menu-buttons">
            <a href='/' className="side-menu-button-layout link-no-decor">
              <h1>Home</h1>
              <Icon icon="akar-icons:chevron-up" rotate={1} className="pointer"/>
            </a>
            <div className="mobile-nav-buttons">
              <Link className="login_button_nav_side" to={`/login`}>Login</Link>
              <Link className="register_button_nav_side" to={`/register`}>Register</Link>                
            </div>  
          </div>
        </div>     
    </div>
  )
else if(location.pathname === '/login')
  return (
    <div className="nav">
      <div className="desktop" id='root'>
      <Link to={`/`}>
        <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
      </Link>
      <Link className="register_button_nav" to={`/register`}>Register</Link>                
      </div> 
      <div className="mobile" id='root'>
        <Icon icon="carbon:menu" className="pointer orange" onClick={openMenu} width={30}/>

        <Link to={`/`}>
          <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
        </Link>

        </div>

        <div className={`side-menu ${menuOpen ? "open" : ""}`}>
          <Icon icon="carbon:close" className="pointer" onClick={closeMenu} width={30}/>
          <div className="side-menu-buttons">
            <a href='/' className="side-menu-button-layout link-no-decor">
              <h1>Home</h1>
              <Icon icon="akar-icons:chevron-up" rotate={1} className="pointer"/>
            </a>
            <div className="mobile-nav-buttons">
              <Link className="login_button_nav_side" to={`/login`}>Login</Link>
              <Link className="register_button_nav_side" to={`/register`}>Register</Link>                
            </div>   
          </div>
        </div>     
    </div>
  )
else{
    if(guest){
        return (
            <div className="nav">
              <div className="desktop" id='root'>
              <Link to={`/`}>
                <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
              </Link>
                <div className="nav-buttons">
                  <Link className="login_button_nav" to={`/login`}>Login</Link>
                  <Link className="register_button_nav" to={`/register`}>Register</Link>                
                </div>  
              </div> 
              <div className="mobile" id='root'>
                <Icon icon="carbon:menu" className="pointer orange" onClick={openMenu} width={30}/>

                <Link to={`/`}>
                  <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
                </Link>

                </div>

                <div className={`side-menu ${menuOpen ? "open" : ""}`}>
                <Icon icon="carbon:close" className="pointer" onClick={closeMenu} width={30}/>
                <div className="side-menu-buttons">
                  <a href='/' className="side-menu-button-layout link-no-decor">
                    <h1>Home</h1>
                    <Icon icon="akar-icons:chevron-up" rotate={1} className="pointer"/>
                  </a>
                  <div className="mobile-nav-buttons">
                    <Link className="login_button_nav_side" to={`/login`}>Login</Link>
                    <Link className="register_button_nav_side" to={`/register`}>Register</Link>                
                  </div>  
                </div>
                </div>     
            </div>
          )
    }
    else{
        let white_class = false
        let curr_address = location.pathname.slice(0,6)
        if(location.pathname === '/profile' || curr_address == '/user/'){
          white_class = true;
        }
        return (
          <div className="nav">
            <div className="desktop" id='root'>
                {!white_class &&       
                <Link to={`/`}>
                  <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
                </Link>}
                {white_class &&       
                <Link to={`/`}>
                  <img src='http://localhost:4000/api/uploads/nav_white_logo.png' width="150" />
                </Link>}
                <div className="button logged-in">
                    <Link className={`${white_class ? "white" : "orange"}`} to="/">
                        Home
                    </Link>

                    <a onClick={openModalSettings} className={`pointer ${white_class ? "white" : "orange"}`}>Settings</a>
                    {/* if state is true, then it render modal component, with the passed component as prop*/}
                    {settingsIsOpen && <ModalComp open={settingsIsOpen} children={<Settings loggedUser={user}/>} stayOpen={setSettingsIsOpen}></ModalComp>}

                    <Link className={`${white_class ? "white" : "orange"}`} to="/"
                        onClick={logout}>Sign out
                    </Link>
                    <Link to={`/profile`}>
                    <img className="profile-image" src={user.image} width="50" />
                    </Link>
                    <Icon icon="carbon:add" onClick={openModalAdd} className={`pointer ${white_class ? "white-icon" : "orange"}`}  width={30}/>
                    {/* if state is true, then it render modal component, with the passed component as prop*/}
                    {addIsOpen && <ModalComp open={addIsOpen} children={<AddQuote />} stayOpen={setAddIsOpen}></ModalComp>}
                </div>
            </div>
            <div className="mobile" id='root'>

            <Icon icon="carbon:menu" className="pointer orange" onClick={openMenu} width={30}/>

            <Link to={`/`}>
              <img src='http://localhost:4000/api/uploads/nav_black_logo.png' width="150" />
            </Link>

            <Icon icon="carbon:add" className="pointer orange" onClick={openModalAdd} width={30}/>

            
          </div>

          <div className={`side-menu ${menuOpen ? "open" : ""}`}>
            <Icon icon="carbon:close" className="pointer" onClick={closeMenu}  width={30}/>
            <div className="side-menu-buttons">
              <div className="side-menu-profile">
                <Link to={`/profile`}>
                  <img src={user.image} width="50" />
                </Link>
                <div>{user.first_name} {user.last_name}</div>
              </div>
              <a href='/' className="side-menu-button-layout link-no-decor">
                <h1>Home</h1>
                <Icon icon="akar-icons:chevron-up" rotate={1} className="pointer"/>
              </a>
              <a onClick={openModalSettings} className="side-menu-button-layout">
                <h1>Settings</h1>
                <Icon icon="akar-icons:chevron-up" rotate={1} className="pointer"/>
              </a>
              <a onClick={logout} className="side-menu-button-layout">
                <h1><span>Logout</span></h1>
                <Icon icon="akar-icons:chevron-up" rotate={1} className="pointer orange"/>
              </a>
            </div>
          </div>
        </div>
          )
    }
}

}

export default Nav