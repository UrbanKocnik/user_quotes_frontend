import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Paginator from '../components/Paginator'
import BestLoggedUserQuotes from '../components/profile/BestLoggedUserQuotes'
import RecentLoggedUserQuotes from '../components/profile/RecentLoggedUserQuotes'
import LoggedProfileData from '../components/profile/LoggedProfileData'
import Quote from '../models/quote'
import User from '../models/user'
import LoggedUserLikedQuotes from '../components/profile/LoggedUserLikedQuotes'
import Footer from '../components/Footer'

const Profile = () => {
    const [user, setUser] = useState(new User())
    const [signedIn, setSignedIn] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [quoteCount, setQuoteCount] = useState(0)
    const [karma, setKarma] = useState(0)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [prevMultiplier, setPrevMultiplier] = useState(1)
    const [liked, setLiked] = useState(0)
    const [base, setBase] = useState(4)

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
            //rerender on pagination page change
            if(prevMultiplier !== multiplier){
              setPrevMultiplier(multiplier)
              setLoaded(false)
            }
            const response = await axios.get(`me/liked?page=${page}&base=${base}`)
            setLiked(response.data.meta.last_page * base)
            if(liked === 0 && quoteCount > 0){
              setLiked(1) //da se pokaze pagination ceprav ni likanih quotov
            }        
            if(liked > quoteCount){
              setLastPage(response.data.meta.last_page)
            }   
            else{
              const lp = Math.ceil((quoteCount / base))
              setLastPage(lp) // to hide load more button when all 3 options are out of quotes
            }
        }
        catch(e){
          setSignedIn(false);
        }
      }
      getUser();
    }, [loaded, multiplier]);

    if(!signedIn){
        return <Navigate to={'/'} />
    }
  return (
    <>
    <Nav />
      <div className='profile-page'>  
      
          <div className='orange-background'></div>       
          <div>
              {loaded && <LoggedProfileData loggedUser={user} quotes={quoteCount} karma={karma}/>}
          </div>
          <div className='profile-quotes'>
            <div>{loaded && <BestLoggedUserQuotes page={multiplier}/>}</div>
            <div>{loaded && <RecentLoggedUserQuotes page={multiplier}/>}</div>          
            <div>{loaded && <LoggedUserLikedQuotes page={multiplier}/>}</div>          
          </div>
          <div>
            {liked > 0 && <Paginator lastPage={lastPage} multiplier={multiplier} pageChanged={setMultiplier}/>}
          </div>  
      </div>
      <Footer />
    </>

  )
}

export default Profile