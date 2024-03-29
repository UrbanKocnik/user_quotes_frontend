import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../../models/quote'
import QuoteCard from '../QuoteCard'

const LoggedUserLikedQuotes = (props: {
  page: number
}) => {
    const [quotes, setQuotes] = useState<Quote[]>([])

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`me/liked?page=${props.page}`)
            setQuotes(data.data)
          }
        )()
      }, [])
      if(quotes.length === 0){
        return (
          <div className='profile-quotes-column'>
            <h1>Your liked quotes</h1>
            <div>
              <p>You have no liked quotes!</p>
            </div>
          </div>
        )
      }
  return (
    <div className='profile-quotes-column'>
        <h1>Your liked quotes</h1>
        <div className='profile-quotecards'>
            {quotes.map((q: Quote) => {
                return(                   
                    <div key={q.id}>
                        <QuoteCard quote={q} rating={"liked"}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default LoggedUserLikedQuotes