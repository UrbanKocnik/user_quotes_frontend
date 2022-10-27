import { useEffect, useState } from "react"
import Quote from "../models/quote"
import '../styles/quoteCard.css'
import Modal from 'react-modal';
import ModalComp from './modals/ModalComp';
import EditQuote from "./actions/EditQuote";
import DeleteQuote from "./actions/DeleteQuote";

interface QuoteProps {
  quote: Quote,
  rating: string,
  author?: boolean
}

const QuoteCard = ({quote = new Quote(), rating = "no rating", author = false}: QuoteProps) => {
 
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [isAuthor, setIsAuthor] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(){
    setIsOpen(true)  
  }

  Modal.setAppElement('#root');

  useEffect(() => {
    (
      async () => {
        if(rating === "liked"){
          setLiked(true)
        }
        else if(rating === "disliked"){
          setDisliked(true)
        }       
        if(author){
          setIsAuthor(true)
        }
      }
    )()
  })

  return (
    <div className="quoteCard">
        <div className='rating'>
            {liked && <button>LIKED</button>}
            {!liked && <button>Like</button>}
            <h4>{quote.rating}</h4>
            {disliked && <button>DISLIKED</button>}
            {!disliked && <button>Dislike</button>}
        </div>
        <div className='quote'>
            <p>{quote.quote}</p>
        </div>
        <div className='author'>
            <p>{quote.user.image}</p>
            <p>{quote.user.first_name} {quote.user.last_name}</p>
        </div>
        {isAuthor && 
        <div id="root">
          <button onClick={openModal}>Edit</button>
          {modalIsOpen && <ModalComp open={modalIsOpen} children={<EditQuote sentQuote={quote}/>} stayOpen={setIsOpen} />}
          <button onClick={openModal}>Delete</button>
          {modalIsOpen && <ModalComp open={modalIsOpen} children={<DeleteQuote sentQuote={quote}/>} stayOpen={setIsOpen} />}
        </div>}
    </div>
    
  )
}

export default QuoteCard