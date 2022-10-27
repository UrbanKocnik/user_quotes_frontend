import { useEffect, useState } from "react"
import Quote from "../models/quote"

const QuoteCard = (props: {
  quote: Quote,
  rating: string
}) => {
 
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  useEffect(() => {
    (
      async () => {
        if(props.rating === "liked"){
          setLiked(true)
        }
        else if(props.rating === "disliked"){
          setDisliked(true)
        }
      }
    )()
  })

  return (
    <div className="quoteCard">
        <div className='rating'>
            {liked && <button>LIKED</button>}
            {!liked && <button>Like</button>}
            <h4>{props.quote.rating}</h4>
            {disliked && <button>DISLIKED</button>}
            {!disliked && <button>Dislike</button>}
        </div>
        <div className='quote'>
            <p>{props.quote.quote}</p>
        </div>
        <div className='author'>
            <p>{props.quote.user.image}</p>
            <p>{props.quote.user.first_name} {props.quote.user.last_name}</p>
        </div>
    </div>
    
  )
}

export default QuoteCard