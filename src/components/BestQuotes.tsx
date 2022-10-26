import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Quote from '../models/quote'
import User from '../models/user'
import Paginator from './Paginator'
import QuoteCard from './QuoteCard'

const BestQuotes = () => {
    
    const [quotes, setQuotes] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [signedIn, setSignedIn] = useState(true) //send logged in state from page so you dont call twice (render welcome or random)
    const [user, setUser] = useState(new User()) 

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`quotes?page=${multiplier}`)
            setQuotes(data.data) //prvi data je od axios (ime spremenljivke), drugi data je ime propertya od axios data.
            setLastPage(data.meta.last_page)

            try{
                const {data} = await axios.get('user')
        
                setUser(new User(
                  data[0].id,
                  data[0].first_name,
                  data[0].last_name,
                  data[0].email,
                  data[0].image
                  ))
              }
              catch(e){
                setSignedIn(false);
              }
          }
        )()
      }, [multiplier])
      
  return (
    <div>
        <div>
            <h1>Most upvoted quotes</h1>
            <p>Most upvoted quotes on the platform. Give a like to the ones you like to keep them in your profile</p>
        </div>
        <div>
            {quotes.map((q: Quote) => {
                return(
                    <div key={q.id}>
                        <QuoteCard quote={q} />
                    </div>
                )
            })}
        </div>
        <div>
            {signedIn && <Paginator lastPage={lastPage} currPage={page} multiplier={multiplier} pageChanged={setMultiplier}/>}
            {!signedIn && <Link to={`/register`}>Sign up to see more</Link>}
        </div>
    </div>
  )
}

export default BestQuotes