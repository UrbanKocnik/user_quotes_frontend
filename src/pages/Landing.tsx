import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BestQuotes from '../components/landing page/BestQuotes'
import Nav from '../components/Nav'
import RandomQuote from '../components/landing page/RandomQuote'
import RecentQuotes from '../components/landing page/RecentQuotes'
import WelcomeGuest from '../components/landing page/WelcomeGuest'
import User from '../models/user'

const Landing = () => {

  const [user, setUser] = useState(new User())
  const [signedIn, setSignedIn] = useState(true)

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
        setSignedIn(false);
      }
    }
    getUser();
  }, []);
  return (
      <>
        <Nav />
        <div>
          {!signedIn && <WelcomeGuest />}
          {signedIn && <RandomQuote />}
        </div>
        <div>
          <BestQuotes loggedIn={signedIn}/>
        </div>
        <div>
          {signedIn && <RecentQuotes loggedIn={signedIn}/>}
        </div>
      </>
  )
}

export default Landing