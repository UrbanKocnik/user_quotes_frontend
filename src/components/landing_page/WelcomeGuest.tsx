import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Quote from '../../models/quote'
import QuoteCard from '../QuoteCard'

const WelcomeGuest = () => {
    const [quotes, setQuotes] = useState([])
    const [quoteNr, setQuoteNr] = useState(false)

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`quotes?condition=likes&base=3`)
            setQuotes(data.data)
            if(data.data.length === 3){
              setQuoteNr(true)
            }
          }
        )()
      }, [])
      
  return (
    <div className='welcome-page'>
      <div className="welcome-first-row">
        <div className='welcome-text'>
          <h1 className='text-xlg'>Welcome <br />to <span>Quotastic</span></h1>
          <h3 className='text-md'>Quotastic is free online platform for you <br />to explore the quips, quotes, and proverbs. Sign <br />up and express yourself</h3>
          <Link to={'/register'} className="register_button_nav">Sign up</Link>
        </div>
          {quoteNr && 
          <div className='display-quotes'>
            <div className='top-quote'>
              <QuoteCard quote={quotes[0]} rating={"no rating"} />
            </div>
            <div className='center-quote'>
                <QuoteCard quote={quotes[1]} rating={"no rating"} />
            </div>
            <div className='bottom-quote'>
                <QuoteCard quote={quotes[2]} rating={"no rating"} />
            </div>
          </div>
          }
      </div>

      <div className='explore-text'>
          <h1>Explore the world of <span>fantastic quotes</span></h1>
      </div>
    </div>
  )
}

export default WelcomeGuest