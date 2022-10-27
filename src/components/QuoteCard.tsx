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
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);

  function editModal(){
    setEditIsOpen(true)  
  }

  function deleteModal(){
    setDeleteIsOpen(true)  
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
          <button onClick={editModal}>Edit</button>
          {modalEditIsOpen && <ModalComp open={modalEditIsOpen} children={<EditQuote sentQuote={quote}/>} stayOpen={setEditIsOpen} />}
          <button onClick={deleteModal}>Delete</button>
          {modalDeleteIsOpen && <ModalComp open={modalDeleteIsOpen} children={<DeleteQuote sentQuote={quote}/>} stayOpen={setDeleteIsOpen} />}
        </div>}
    </div>
    
  )
}

export default QuoteCard