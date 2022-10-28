import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Quote from '../models/quote'
import User from '../models/user'
import Paginator from './Paginator'
import QuoteCard from './QuoteCard'

const BestQuotes = (props: any) => {
    
    const [quotes, setQuotes] = useState([])
    const [votes, setVotes] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [signedIn, setSignedIn] = useState(true) //send logged in state from page so you dont call twice (render welcome or random)

    useEffect(() => {
      (
        async () => {
          const {data} = await axios.get(`quotes?page=${multiplier}&condition=created_at`)
          setQuotes(data.data) 
          setLastPage(data.meta.last_page)
          setSignedIn(props.loggedIn)          
          if(signedIn){            
              const response = await axios.get(`quotes/votes`)
              setVotes(response.data)
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
                let state = "" 
                if(signedIn){                                     
                    votes.every(vote => {
                        if(vote.quote_id === q.id){
                            if(vote.rating){
                                state = "liked"
                                return false
                            }
                            else{
                                state = "disliked"
                                return false
                            }
                        }
                        else{
                          state = "no rating"
                          return true;
                      }
                    });                    
                }
                if(state != "" || votes.length === 0){
                    return(
                    
                        <div key={q.id}>
                            <QuoteCard quote={q} rating={state} />
                        </div>
                    )
                }
            })}
        </div>
        <div>
            {signedIn && <Paginator lastPage={lastPage} multiplier={multiplier} pageChanged={setMultiplier}/>}
            {!signedIn && <Link to={`/register`}>Sign up to see more</Link>}
        </div>
    </div>
  )
}

export default BestQuotes