import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import Quote from '../../models/quote';
import ConfirmModal from '../modals/ConfirmModal';

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
        <ConfirmModal open={true} message={"Your quote was edited"} />
      )
    }

  return (
    <div>
        <h1>Are you feeling inspired?</h1>
        <h3>You can post quotes. You can delete them on your profile.</h3>
        <form onSubmit={submit}>
            <input type="quote" className="form-control" placeholder={props.sentQuote.quote} required onChange={e => setQuote(e.target.value)}/>
            
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default EditQuote