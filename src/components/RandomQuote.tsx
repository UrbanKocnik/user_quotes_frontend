import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Quote } from '../models/quote';
import QuoteCard from './QuoteCard'

const RandomQuote = () => {
    const[quote, setQuote] = useState(new Quote())
    
    useEffect(() => {
        const getQuote = async () =>{
          try{
            const {data} = await axios.get('quotes/random')

            setQuote(new Quote(
                data[0].id,
                data[0].quote,
                data[0].likes,
                data[0].dislikes,
                data[0].rating,
                data[0].user
            ))    
          }
          catch(e){
              console.log('error')            
          }
        }
        getQuote()
      }, []);
  return (
    <div>
        <div>
            <h1>Quote of the day</h1>
            <h2>Quote of the day is a randomly chosen quote.</h2>
        </div>
        <div>
             
            <QuoteCard quote={quote} rating={"liked"}/>
        </div>
    </div>
  )
}

export default RandomQuote