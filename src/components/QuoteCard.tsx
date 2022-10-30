import { useEffect, useState } from "react"
import Quote from "../models/quote"
import '../styles/styles.js'
import Modal from 'react-modal';
import ModalComp from './modals/ModalComp';
import EditQuote from "./actions/EditQuote";
import DeleteQuote from "./actions/DeleteQuote";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';

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
            {liked && <Icon icon="akar-icons:chevron-up" onClick={likeQuote} className="orange-block pointer"/>}
            {!liked && <Icon icon="akar-icons:chevron-up" onClick={likeQuote} className="pointer"/>}
            <h4>{score}</h4>
            {disliked && <Icon icon="akar-icons:chevron-up" rotate={2} onClick={dislikeQuote} className="blue-block pointer"/>}
            {!disliked && <Icon icon="akar-icons:chevron-up" rotate={2} onClick={dislikeQuote} className="pointer"/>}
        </div>
        <div className="quote-card-mid-colum">
          <div className='quote'>
                <p>{quote.quote}</p>
            </div>
            <div className='author'>
              <Link to={`/user/${quote.user.id}/view`}>
                <img src={quote.user.image} width="20" />               
              </Link>
              <Link className="author" to={`/user/${quote.user.id}/view`}>
                <p>{quote.user.first_name} {quote.user.last_name}</p>               
              </Link>            
            </div>
        </div>
        {!isAuthor && <div></div>}
        {isAuthor && 
        <div id="root" className="quote-action-buttons orange-block">
          <Icon icon="bytesize:settings" onClick={editModal} className="pointer"/>
          {modalEditIsOpen && <ModalComp open={modalEditIsOpen} children={<EditQuote sentQuote={quote}/>} stayOpen={setEditIsOpen} />}
          <Icon icon="bi:x-lg" onClick={deleteModal} className="pointer"/>
          {modalDeleteIsOpen && <ModalComp open={modalDeleteIsOpen} children={<DeleteQuote sentQuote={quote}/>} stayOpen={setDeleteIsOpen} />}
        </div>}
    </div>
    
  )
}

export default QuoteCard