import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  if(location.pathname === '/login' || location.pathname === '/register'){
    return (
      <div className='auth-footer'>
        <div className='footer-items'>
          <img src='http://localhost:4000/api/uploads/footer_logo.png' width="50" />
          <p>All rights reserved | skillupmentor.com</p>
        </div>
      </div>
      
    )
  }
  return (
    <div className='footer'>
      <div className='footer-items'>
        <img src='http://localhost:4000/api/uploads/footer_logo.png' width="50" />
        <p>All rights reserved | skillupmentor.com</p>
      </div>
    </div>
    
  )
}

export default Footer