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
    const [signedIn, setSignedIn] = useState(false) //send logged in state from page so you dont call twice (render welcome or random)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (
          async () => {           
            if(!isLoading){  
              setIsLoading(true)
              setSignedIn(props.loggedIn)
              if(props.loggedIn){
                const response = await axios.get(`quotes/votes`)
                setVotes(response.data)
              }    
              const {data} = await axios.get(`quotes?page=${multiplier}&condition=likes`)
              setQuotes(data.data)  
              setLastPage(data.meta.last_page)
              setIsLoading(false)
            }
          }
        )()
      }, [multiplier, signedIn])
      
      if(isLoading){
        return (
          <div className='best-landing-page'>
            <h1><span>Most upvoted quotes</span></h1>
            <p>Most upvoted quotes on the platform. Give a like to the ones you like to keep them in your profile</p>
            <div>
              <p>Loading</p>
            </div>
          </div>
        )
      }
      else {
        if(quotes.length === 0){
        return (
          <div className='best-landing-page'>
            <h1><span>Most upvoted quotes</span></h1>
            <p>Most upvoted quotes on the platform. Give a like to the ones you like to keep them in your profile</p>
            <div>
              <p>There are no quotes!</p>
            </div>
          </div>
        )
      }
    }

  return (
    <div className='best-landing-page'>
        <div className='best-landing-first-row'>
            <h1><span>Most upvoted quotes</span></h1>
            <p>Most upvoted quotes on the platform. Give a like to the ones you like to keep them in your profile</p>
        </div>
        <div>           
            {quotes.map((q: Quote) => {
              let state = ""                     
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
            {!signedIn && <Link to={`/register`} className='register_button_landing'>Sign up to see more</Link>}
        </div>
    </div>
  )
}

export default BestQuotes