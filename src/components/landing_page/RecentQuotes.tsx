import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Quote from '../../models/quote'
import Paginator from '../Paginator'
import QuoteCard from '../QuoteCard'

const BestQuotes = (props:{
    loggedIn: boolean
}) => {
    
    const [quotes, setQuotes] = useState([])
    const [votes, setVotes] = useState<any[]>([])
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [signedIn, setSignedIn] = useState(true) //send logged in state from page so you dont call twice (render welcome or random)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (
          async () => {
            setSignedIn(props.loggedIn)
            if(!isLoading){  
              setIsLoading(true)
              const response = await axios.get(`quotes/votes`)
              setVotes(response.data)
      
              const {data} = await axios.get(`quotes?page=${multiplier}&condition=created_at`)
              setQuotes(data.data)  
              setLastPage(data.meta.last_page)
  
              setIsLoading(false)
            }
          }
        )()
      }, [multiplier])
      
      if(isLoading){
        return (
          <div>
            <h1>Most recent quotes</h1>
            <p>Recent quotes updates as soon user adds new quote. Go ahead and show them that you have seen the new quote and like the ones you like.</p>
            <div>
              <p>Loading</p>
            </div>
          </div>
        )
      }
      else {
        if(quotes.length === 0){
        return (
          <div>
            <h1>Most recent quotes</h1>
            <p>Recent quotes updates as soon user adds new quote. Go ahead and show them that you have seen the new quote and like the ones you like.</p>
            <div>
              <p>There are no quotes!</p>
            </div>
          </div>
        )
      }
    }

  return (
    <div>
        <div>
        <h1>Most recent quotes</h1>
            <p>Recent quotes updates as soon user adds new quote. Go ahead and show them that you have seen the new quote and like the ones you like.</p>
        </div>
        <div>           
            {quotes.map((q: Quote) => {
              let state = ""      
                  console.log(votes)                   
                  votes.every((vote) => {
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
                    return(                    
                        <div key={q.id}>
                            <QuoteCard quote={q} rating={state} />
                        </div>
                    )
                })}
            </div>
        <div>
            {signedIn && <Paginator lastPage={lastPage} multiplier={multiplier} pageChanged={setMultiplier}/>}
        </div>
    </div>
  )
}

export default BestQuotes