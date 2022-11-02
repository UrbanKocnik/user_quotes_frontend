import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../../models/quote'
import User from '../../models/user'
import QuoteCard from '../QuoteCard'

const BestUserQuotes = (props: {
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
    
            const {data} = await axios.get(`me/usersquotes/${props.user.id}?page=${props.page}&condition=likes`)
            setQuotes(data.data)  

            setIsLoading(false)
          }
        }
      )()
    }, [])

  if(isLoading){
    return (
      <div>
        <h1><span>Best users' quotes</span></h1>
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
        <h1><span>Best users' quotes</span></h1>
        <div>
          <p>User has no quotes!</p>
        </div>
      </div>
    )
  }
    return (
      <div>
          <h1><span>Best users' quotes</span></h1>
          <div className='profile-quotecards'>
            
          {quotes.map((q: Quote) => {
            let author = false;
            if(q.user.id === props.user.id){
              author = true;
            }
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
                          <QuoteCard quote={q} rating={state} author={author} />
                      </div>
                  )
              })}
          </div>
      </div>
    )
  }

}

export default BestUserQuotes