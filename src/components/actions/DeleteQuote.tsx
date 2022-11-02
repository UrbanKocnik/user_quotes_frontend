import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import Quote from '../../models/quote';
import ResultModal from '../modals/ResultModal';

const DeleteQuote = (props: any) => {
    const [oldQuote, setOldQuote] = useState(new Quote());
    const [confirm, setConfirm] = useState(false)

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      await axios.delete(`me/myquote/${oldQuote.id}`);
      setConfirm(true)
    }

    useEffect(() => {
      (
        async () => {
          setOldQuote(new Quote(
            props.sentQuote.id,
            props.sentQuote.quote,
            props.sentQuote.likes,
            props.sentQuote.dislikes,
            props.sentQuote.rating,
          ))
        }
      )()
    }, [])

    if(confirm){
      return(
        <ResultModal open={true} message={"Your quote was deleted"} />
      )
    }

  return (
    <div className="delete-settings">
        <h1 className='text-lg'>Are you sure?</h1>
        <h3>This quote will be deleted. There is no undo of this action.</h3>
        <form onSubmit={submit}>
            <button className="modal-submit-button pointer" type="submit">Delete</button>
        </form>
    </div>
  )
}

export default DeleteQuote