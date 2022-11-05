import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BestQuotes from '../components/landing_page/BestQuotes'
import Nav from '../components/Nav'
import RandomQuote from '../components/landing_page/RandomQuote'
import RecentQuotes from '../components/landing_page/RecentQuotes'
import WelcomeGuest from '../components/landing_page/WelcomeGuest'
import User from '../models/user'
import Footer from '../components/Footer'

const Landing = () => {

  const [user, setUser] = useState(new User())
  const [signedIn, setSignedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getUser = async () =>{
      
        if(!isLoading){
        setIsLoading(true)
        try{
          const {data} = await axios.get('me')

          setUser(new User(
            data[0].id,
            data[0].first_name,
            data[0].last_name,
            data[0].email,
            data[0].image
            ))
            setSignedIn(true)
            setIsLoading(false)
        }
        catch(e){
          setSignedIn(false);
          setIsLoading(false)
        }
      }
    }
    getUser();
  }, [signedIn]);
  return (
      <>
        <div className="landing-page">
          <div>
            {!signedIn && <WelcomeGuest />}
            {signedIn && <RandomQuote />}
          </div>
          <div>
            {!isLoading && <BestQuotes loggedIn={signedIn} user={user}/>}
          </div>
          <div>
            {signedIn && <RecentQuotes loggedIn={signedIn} user={user}/>}
          </div>
          
        </div>
      <Footer />
        
      </>
  )
}

export default Landing