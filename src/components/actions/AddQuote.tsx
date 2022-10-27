import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import User from '../../models/user'

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
        <h1>Are you feeling inspired?</h1>
        <h3>You can post quotes. You can delete them on your profile.</h3>
        <form onSubmit={submit}>
            <input type="quote" className="form-control" placeholder="Write your quote here" required onChange={e => setQuote(e.target.value)}/>
            
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddQuote