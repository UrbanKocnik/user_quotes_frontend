import { useEffect, useState } from "react"
import Quote from "../models/quote"
import '../styles/styles.js'
import Modal from 'react-modal';
import ModalComp from './modals/ModalComp';
import EditQuote from "./actions/EditQuote";
import DeleteQuote from "./actions/DeleteQuote";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [score, setScore] = useState(0);
  const [padding, setPadding] = useState(0);

  function editModal(){
    setEditIsOpen(true)  
  }

  function deleteModal(){
    setDeleteIsOpen(true)  
  }

  async function likeQuote(){
    await axios.post(`quotes/${quote.id}/upvote`,
    {
        quote
    }); 
    setDisliked(false)
    setLiked(true)
    setScore(score + 1 + padding)
  }

  async function dislikeQuote(){
    await axios.post(`quotes/${quote.id}/downvote`,
    {
        quote
    }); 
    
    setDisliked(true)
    setLiked(false) 
    setScore(score - 1 - padding)
  }

  Modal.setAppElement('#root');

  useEffect(() => {
    (
      async () => {

        if(rating === "liked"){
          setLiked(true)
          setPadding(1)
        }
        else if(rating === "disliked"){
          setDisliked(true)
          setPadding(1) // to add/subtract correctly 
        }       
        if(author){
          setIsAuthor(true)
        }
        setScore(quote.rating)       
      }
    )()
  }, [])

  return (
    <div className="quoteCard">
        <div className='rating'>
            {liked && <button onClick={likeQuote}>LIKED</button>}
            {!liked && <button onClick={likeQuote}>Like</button>}
            <h4>{score}</h4>
            {disliked && <button onClick={dislikeQuote}>DISLIKED</button>}
            {!disliked && <button onClick={dislikeQuote}>Dislike</button>}
        </div>
        <div className='quote'>
            <p>{quote.quote}</p>
        </div>
        <div className='author'>
          <Link to={`/user/${quote.user.id}/view`}>
            <img src={quote.user.image} width="50" />
            <p>{quote.user.first_name} {quote.user.last_name}</p>
          </Link>
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