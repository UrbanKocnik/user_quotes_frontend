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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (
          async () => {
            
            if(!isLoading){  
              setIsLoading(true)
              const response = await axios.get(`quotes/votes`)
              setVotes(response.data)
      
              const {data} = await axios.get(`me/usersquotes/${props.user.id}?page=${props.page}&condition=created_at`)
              setQuotes(data.data)  

              setIsLoading(false)
            }
          }
        )()
      }, [])

    if(isLoading){
      return (
        <div>
          <h1>Most recent</h1>
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
          <h1>Most recent</h1>
          <div>
            <p>You have no quotes!</p>
          </div>
        </div>
      )
    }
      return (
        <div>
            <h1>Most recent</h1>
            <div className='profile-quotecards'>
              
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
        </div>
      )
    }

}

export default RecentUserQuotes