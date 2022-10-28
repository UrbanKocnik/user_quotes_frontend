import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../models/quote'
import Paginator from './Paginator'
import QuoteCard from './QuoteCard'

const RecentQuotes = (props: any) => {
    
    const [quotes, setQuotes] = useState([])
    const [votes, setVotes] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [signedIn, setSignedIn] = useState(true)

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
            <h1>Most recent quotes</h1>
            <p>Recent quotes updates as soon user adds new quote. Go ahead and show them that you have seen the new quote and like the ones you like.</p>
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
            <Paginator lastPage={lastPage} multiplier={multiplier} pageChanged={setMultiplier}/>
        </div>
    </div>
  )
}

export default RecentQuotes