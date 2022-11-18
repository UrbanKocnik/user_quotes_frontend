import React from 'react'
import { useLocation } from 'react-router-dom'
import FooterLogo from '../images/footer_logo.png'

const Footer = () => {
  const location = useLocation()
  if(location.pathname === '/login' || location.pathname === '/register'){
    return (
      <div className='auth-footer'>
        <div className='footer-items'>
          <img src={FooterLogo} width="50" />
          <p>All rights reserved | skillupmentor.com</p>
        </div>
      </div>
      
    )
  }
  return (
    <div className='footer'>
      <div className='footer-items'>
        <img src={FooterLogo} width="50" />
        <p>All rights reserved | skillupmentor.com</p>
      </div>
    </div>
    
  )
}

export default Footer