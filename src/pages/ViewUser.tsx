import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import Paginator from '../components/Paginator'
import BestUserQuotes from '../components/view_user/BestUserQuotes'
import ProfileData from '../components/view_user/ProfileData'
import RecentUserQuotes from '../components/view_user/RecentUserQuotes'
import UserLikedQuotes from '../components/view_user/UserLikedQuotes'
import Quote from '../models/quote'
import User from '../models/user'

const ViewUser = () => {
    const [user, setUser] = useState(new User())
    const [signedUser, setSignedUser] = useState(new User())
    const [signedIn, setSignedIn] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [quoteCount, setQuoteCount] = useState(0)
    const [karma, setKarma] = useState(0)
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [prevMultiplier, setPrevMultiplier] = useState(1)
    const [liked, setLiked] = useState(0)
    const [owner, setOwner] = useState(false)
    const [base, setBase] = useState(4)
    const [isVisible, setIsVisible] = useState(true)

    const { id } = useParams();

    useEffect(() => {
      const getUser = async () =>{
        try{
        
          const {data} = await axios.get(`me/user/${id}`)
  
          setUser(new User(
            data[0].id,
            data[0].first_name,
            data[0].last_name,
            data[0].email,
            data[0].image
            ))

            const loggedUser = await axios.get('me')
  
            setSignedUser(new User(
              loggedUser.data[0].id,
              loggedUser.data[0].first_name,
              loggedUser.data[0].last_name,
              loggedUser.data[0].email,
              loggedUser.data[0].image
              ))
            if(loggedUser.data[0].id === data[0].id){
              setOwner(true)
            }

            setSignedIn(true)
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
            const response = await axios.get(`me/${user.id}/liked?page=${page}&base=${base}`)
            setLiked(response.data.meta.last_page * base)
            if(liked === 0 && quoteCount > 0){
              setLiked(1) //da se pokaze pagination ceprav ni likanih quotov, ker je pagination show na liked quotes > 0
            }        
            if(liked > quoteCount){
              setLastPage(response.data.meta.last_page)
            }   
            else{
              const lp = Math.ceil((quoteCount / base))
              setLastPage(lp) // to hide load more button when all 3 options are out of quotes
            }
            if(multiplier === lastPage){
              setIsVisible(false)
            }
        }
        catch(e){
          window.alert("To view user profiles please sign in")
          setSignedIn(false);
        }
      }
      getUser();
    }, [loaded, multiplier, owner]);

    if(!signedIn){
        return <Navigate to={'/'} />
    }
    else if(owner){
      return <Navigate to={'/profile'} />
    }
  return (
    <>
      <Nav />
      <div className='profile-page'>  
        <div className='orange-background'></div>        
        <div>
            {loaded && <ProfileData loggedUser={user} quotes={quoteCount} karma={karma}/>}
        </div>
        <div className='profile-quotes'>
          {loaded && <BestUserQuotes page={multiplier} user={user}/>}
          {loaded && <RecentUserQuotes page={multiplier} user={user}/>}
          {loaded && <UserLikedQuotes page={multiplier} user={user}/>} 
        </div>
        <div>
          { isVisible && liked > 0 && <Paginator lastPage={lastPage} multiplier={multiplier} pageChanged={setMultiplier}/>}
        </div>
      
      </div>
      <Footer />
    </>

  )
}

export default ViewUser