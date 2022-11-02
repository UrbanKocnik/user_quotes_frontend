import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../../models/quote'
import QuoteCard from '../QuoteCard'

const BestLoggedUserQuotes = (props: {
  page: number
}) => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`me/usersquotes?page=${props.page}&condition=likes`)
            setQuotes(data.data)   
          }
        )()
      }, [])
      if(quotes.length === 0){
        return (
          <div>
            <h1><span>Most liked quotes</span></h1>
            <div>
              <p>You have no quotes!</p>
            </div>
          </div>
        )
      }
  return (
    <div>
        <h1><span>Most liked quotes</span></h1>
        <div className='profile-quotecards'>
            {quotes.map((q: Quote) => {
                return(                   
                    <div key={q.id}>
                        <QuoteCard quote={q} rating={"no rating"} author={true}/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default BestLoggedUserQuotes