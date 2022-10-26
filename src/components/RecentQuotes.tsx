import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../models/quote'
import Paginator from './Paginator'
import QuoteCard from './QuoteCard'

const RecentQuotes = () => {
    
    const [quotes, setQuotes] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`quotes?page=${multiplier}&condition=created_at`)
            setQuotes(data.data) 
            setLastPage(data.meta.last_page)
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
                return(
                    <div key={q.id}>
                        <QuoteCard quote={q} />
                    </div>
                )
            })}
        </div>
        <div>
            <Paginator lastPage={lastPage} currPage={page} multiplier={multiplier} pageChanged={setMultiplier}/>
        </div>
    </div>
  )
}

export default RecentQuotes