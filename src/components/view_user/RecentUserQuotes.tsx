import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../../models/quote'
import User from '../../models/user'
import QuoteCard from '../QuoteCard'

const RecentUserQuotes = (props: {
  page: number,
  user: User
}) => {
    const [quotes, setQuotes] = useState([])
    const [votes, setVotes] = useState<any[]>([])
    const [retry, setRetry] = useState(0)
    const [noVotes, setNoVotes] = useState(false)

    useEffect(() => {
        (
          async () => {
            if(retry === 0){
              const {data} = await axios.get(`me/usersquotes/${props.user.id}?page=${props.page}&condition=created_at`)
              setQuotes(data.data)   
  
              const response = await axios.get(`quotes/votes`)
              setVotes(response.data)
            }
            
            if(retry < 3){ //if votes arent loaded yet, wait and rerender
              setRetry(retry+1)             
            }     
            else{
              setNoVotes(true)
            }  
          }
        )()
      }, [retry])
      if(quotes.length === 0){
        return (
          <div>
            <h1>Most recent quotes</h1>
            <div>
              <p>You have no quotes!</p>
            </div>
          </div>
        )
      }
  return (
    <div>
        <h1>Most recent quotes</h1>
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
                if(state != "" || noVotes){
                    return(                    
                        <div key={q.id}>
                            <QuoteCard quote={q} rating={state} />
                        </div>
                    )
                }
            })}
        </div>
    </div>
  )
}

export default RecentUserQuotes