import { useEffect, useState } from "react"
import Quote from "../models/quote"
import '../styles/styles.js'
import Modal from 'react-modal';
import ModalComp from './modals/ModalComp';
import EditQuote from "./actions/EditQuote";
import DeleteQuote from "./actions/DeleteQuote";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Icon } from '@iconify/react';

interface QuoteProps {
  quote: Quote,
  rating: string,
  author?: boolean
}

const QuoteCard = ({quote = new Quote(), rating = "no rating", author = false}: QuoteProps) => {
 
  const location = useLocation()
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [isAuthor, setIsAuthor] = useState(false)
  const [modalEditIsOpen, setEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setDeleteIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [padding, setPadding] = useState(0);
  const [isProfile, setIsProfile] = useState(false);

  function editModal(){
    setEditIsOpen(true)  
  }

  function deleteModal(){
    setDeleteIsOpen(true)  
  }

  async function likeQuote(){
    if(isAuthor){
      return window.alert('Cannot like your own quote!')
    }
    if(!liked){
      await axios.post(`quotes/${quote.id}/upvote`,
      {
          quote
      }); 
      setDisliked(false)
      setLiked(true)
      setScore(score + 1 + padding)
    }
    else{
      window.alert('You have already liked this quote.')
    }
  }

  async function dislikeQuote(){
    if(isAuthor){
      return window.alert('Cannot like your own quote!')
    }
    if(!disliked){
      await axios.post(`quotes/${quote.id}/downvote`,
      {
          quote
      }); 
      
      setDisliked(true)
      setLiked(false) 
      setScore(score - 1 - padding)
    }
    else{
      window.alert('You have already disliked this quote.')
    }
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
        if(location.pathname === '/profile'){
          setIsProfile(true)
        }    
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
              <a href={`/user/${quote.user.id}/view`}>
                <img src={quote.user.image} width="20" />               
              </a>
              <a className="author" href={`/user/${quote.user.id}/view`}>
                <p>{quote.user.first_name} {quote.user.last_name}</p>               
              </a>            
            </div>
        </div>
        {!isAuthor && <div></div>}
        {isAuthor && isProfile &&
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