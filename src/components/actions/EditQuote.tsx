import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import Quote from '../../models/quote';
import ResultModal from '../modals/ResultModal';

const EditQuote = (props: any) => {
    const [quote, setQuote] = useState('');
    const [oldQuote, setOldQuote] = useState(new Quote());
    const [confirm, setConfirm] = useState(false)

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      await axios.put(`me/myquote/${oldQuote.id}`,
      {
          quote
      });
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
        <ResultModal open={true} message={"Your quote was edited"} />
      )
    }

  return (
    <div className='add-modal'>
        <h1 className='text-lg padding-below'>Edit your <span>quote</span></h1>
        <form onSubmit={submit} className="add-quote-form">
        <textarea className="add-quote-input" defaultValue={props.sentQuote.quote} required onChange={e => setQuote(e.target.value)}/>
            
            <button className="modal-submit-button pointer" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default EditQuote