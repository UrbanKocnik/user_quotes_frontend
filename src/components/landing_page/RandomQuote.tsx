import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Quote } from '../../models/quote';
import User from '../../models/user';
import QuoteCard from '../QuoteCard'

const RandomQuote = (props:{
  user: User
}) => {
    const[quote, setQuote] = useState(new Quote())
    const[state, setState] = useState("")
    const[loaded, setLoaded] = useState(false)
    const[isAuthor, setIsAuthor] = useState(false)
    
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
            if(data[0].user.id === props.user.id){
              setIsAuthor(true)
            }
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
            {loaded &&<QuoteCard quote={quote} rating={state} author={isAuthor}/>}
        </div>
    </div>
  )
}

export default RandomQuote