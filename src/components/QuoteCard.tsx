import React from 'react'
import Quote from '../models/quote'

const QuoteCard = (props:any) => {
  return (
    <div className="quoteCard">
        <div className='rating'>
            <button>Like</button>
            <p>Rating</p>
            <button>Like</button>
        </div>
        <div className='quote'>
            <p>Quote</p>
        </div>
        <div className='author'>
            <p>Image</p>
            <p>Author name</p>
        </div>
    </div>
    
  )
}

export default QuoteCard