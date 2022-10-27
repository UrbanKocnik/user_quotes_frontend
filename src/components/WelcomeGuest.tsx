import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Quote from '../models/quote'
import QuoteCard from './QuoteCard'

const WelcomeGuest = () => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`quotes?condition=likes&base=3`)
            setQuotes(data.data)
          }
        )()
      }, [])
      
  return (
    <div>
        <div>
            <h1>Welcome to Quotastic</h1>
            <h3>Quotastic is free online platform for you to explore the quips, quotes, and proverbs. Sign up and express yourself</h3>
            <Link to={'/register'}>Sign up</Link>
        </div>
        <div>
            {quotes.map((q: Quote) => {
                    return(
                        <div key={q.id}>
                            <QuoteCard quote={q} rating={"no rating"} />
                        </div>
                    )
                })}
        </div>
        <div>
            <h1>Explore the world of fantastic quotes</h1>
        </div>
    </div>
  )
}

export default WelcomeGuest