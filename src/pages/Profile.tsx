import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import ProfileData from '../components/profile/ProfileData'
import Quote from '../models/quote'
import User from '../models/user'

const Profile = () => {
    const [user, setUser] = useState(new User())
    const [signedIn, setSignedIn] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [quoteCount, setQuoteCount] = useState(0)
    const [karma, setKarma] = useState(0)

    useEffect(() => {
      const getUser = async () =>{
        try{
          const {data} = await axios.get('me')
  
          setUser(new User(
            data[0].id,
            data[0].first_name,
            data[0].last_name,
            data[0].email,
            data[0].image
            ))
            setQuoteCount(data[0].quotes.length) //counts user quotes
            const karmaSum = data[0].quotes.reduce((sum: number, quote: Quote) => {
                return sum + quote.rating;
            }, 0); //calculates user karma
            setKarma(karmaSum)
            setLoaded(true)
        }
        catch(e){
          setSignedIn(false);
        }
      }
      getUser();
    }, []);

    if(!signedIn){
        return <Navigate to={'/'} />
    }
  return (
    <div>
        <Nav />
        <div>
            {loaded && <ProfileData loggedUser={user} quotes={quoteCount} karma={karma}/>}
        </div>
    </div>
  )
}

export default Profile