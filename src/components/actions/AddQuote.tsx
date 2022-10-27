import axios from 'axios'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import User from '../../models/user'

const AddQuote = (props:{
    user: User
}) => {
    const[user, setUser] = useState(new User())
    const [quote, setQuote] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
      e.preventDefault();

      await axios.post('me/myquote',
      {
          quote
      });
      setRedirect(true);
    }
    
    useEffect(() => {
        (
          async () => {           
            setUser(new User(
                props.user.id,
                props.user.first_name,
                props.user.last_name,
                props.user.email,
                props.user.image
            ))       
          }
        )()
      }, [])

      if(redirect){
        return(
            <h1>Quote added successfully</h1>
            //ask how it would close easier s tem da je to child od child, pa sploh ni komponenta ampak prop
            //al pa za auto update
        )   
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