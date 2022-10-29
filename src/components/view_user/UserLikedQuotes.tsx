import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../../models/quote'
import User from '../../models/user'
import QuoteCard from '../QuoteCard'

const UserLikedQuotes = (props: {
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
    
            const {data} = await axios.get(`quotes/user/liked/${props.user.id}?page=${props.page}`)
            setQuotes(data.data)  

            setIsLoading(false)
          }
        }
      )()
    }, [])

  if(isLoading){
    return (
      <div>
        <h1>Users liked quotes</h1>
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
        <h1>Users liked quotes</h1>
        <div>
          <p>User has no liked quotes!</p>
        </div>
      </div>
    )
  }
    return (
      <div>
          <h1>Users liked quotes</h1>
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
      </div>
    )
  }

}

export default UserLikedQuotes