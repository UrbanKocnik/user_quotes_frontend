import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Quote } from '../../models/quote';
import QuoteCard from '../QuoteCard'

const RandomQuote = () => {
    const[quote, setQuote] = useState(new Quote())
    const[state, setState] = useState("")
    const[loaded, setLoaded] = useState(false)
    
    useEffect(() => {
        const getQuote = async () =>{
          const {data} = await axios.get('quotes/random')
          try{
          
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
              console.log('error getting random quote')            
          }
          let response = null
          if(!loaded){
            response = await axios.get(`quotes/random/rating/${data[0].id}`)
          }
          
          if(response != null && response.data.length > 0){
            if(response.data[0].rating){
              setState("liked")
              setLoaded(true)
            }
            else{
              setState("disliked")
              setLoaded(true)
            }            
          }
          else{
            setState("no rating")
            setLoaded(true)
          }
        }
        getQuote()
      }, []);
  return (
    <div className='best-landing-page'>
        <div className='best-landing-first-row'>
            <h1><span>Quote of the day</span></h1>
            <p>Quote of the day is a randomly chosen quote.</p>
        </div>
        <div className='random-quote'>            
            {loaded &&<QuoteCard quote={quote} rating={state}/>}
        </div>
    </div>
  )
}

export default RandomQuote