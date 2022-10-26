import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BestQuotes from '../components/BestQuotes'
import Nav from '../components/Nav'
import RandomQuote from '../components/RandomQuote'
import RecentQuotes from '../components/RecentQuotes'
import WelcomeGuest from '../components/WelcomeGuest'
import User from '../models/user'

const Landing = () => {

  const [user, setUser] = useState(new User())
  const [guest, setGuest] = useState(false)

  useEffect(() => {
    const getUser = async () =>{
      try{
        const {data} = await axios.get('user')

        setUser(new User(
          data[0].id,
          data[0].first_name,
          data[0].last_name,
          data[0].email,
          data[0].image
          ))
      }
      catch(e){
        setGuest(true);
      }
    }
    getUser();
  }, []);
  return (
      <>
        <Nav />
        <div>
          {guest && <WelcomeGuest />}
          {!guest && <RandomQuote />}
        </div>
        <div>
          <BestQuotes loggedIn={true}/>
        </div>
        <div>
          {!guest && <RecentQuotes />}
        </div>
      </>
  )
}

export default Landing