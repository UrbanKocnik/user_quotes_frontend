import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote from '../models/quote'
import Paginator from './Paginator'
import QuoteCard from './QuoteCard'

const BestQuotes = () => {
    
    const [quotes, setQuotes] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)

    useEffect(() => {
        (
          async () => {
            const {data} = await axios.get(`quotes?page=${multiplier}`)
            setQuotes(data.data) //prvi data je od axios (ime spremenljivke), drugi data je ime propertya od axios data.
            setLastPage(data.meta.last_page)
          }
        )()
      }, [multiplier])
      
  return (
    <div>
        <div>
            <h1>Most upvoted quotes</h1>
            <p>Most upvoted quotes on the platform. Give a like to the ones you like to keep them in your profile</p>
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

export default BestQuotes