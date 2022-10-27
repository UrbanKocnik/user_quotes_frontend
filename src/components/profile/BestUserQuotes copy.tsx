import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../../models/quote'
import QuoteCard from '../QuoteCard'

const RecentUserQuotes = (props: any) => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`me/usersquotes?page=${props.page}&condition=created_at`)
            setQuotes(data.data)   
          }
        )()
      }, [])
      
  return (
    <div>
        <h1>Most recent quotes</h1>
        <div>
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

export default RecentUserQuotes