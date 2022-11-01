import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'

const AddQuote = () => {
    const [quote, setQuote] = useState('');

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      await axios.post('me/myquote',
      {
          quote
      });
      window.location.reload()
    }

  return (
    <div>
        <h1 className='text-lg padding-below'>Are you feeling <span>inspired?</span></h1>
        <p>You can post quotes. You can delete them on your profile.</p>
        <form onSubmit={submit} className="add-quote-form">
            <textarea className="add-quote-input" placeholder="Write your quote here" required onChange={e => setQuote(e.target.value)}/>
            
            <button className="modal-submit-button" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddQuote