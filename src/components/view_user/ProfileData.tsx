import React, { useEffect, useState } from 'react'
import User from '../../models/user'

const ProfileData = (props:{
    loggedUser: User
    quotes: number
    karma: number
}) => {
    const [user, setUser] = useState(new User())
    const [loading, setLoading] = useState(true)
    const [quoteCount, setQuoteCount] = useState(0)
    const [karmaCount, setKarmaCount] = useState(0)

    useEffect(() => {
        (
          async () => {           
            if(props.loggedUser.id !== 0){
                setUser(new User(
                    props.loggedUser.id,
                    props.loggedUser.first_name,
                    props.loggedUser.last_name,
                    props.loggedUser.email,
                    props.loggedUser.image
                ))
                setQuoteCount(props.quotes)
                setKarmaCount(props.karma)
                setLoading(false)
            }
          }
        )()
      }, [loading])
      return (
        <div className='profile-data'>
            <img className="profile-image" src={user.image} />
            <div className='profile-name'>{user.first_name} {user.last_name}</div>
            <div className='user-stats'>
                <div className='quote-number'>
                    <p>Quotes</p>
                    <p className='orange text-md'>{quoteCount}</p>
                </div>
                <div className='user-karma'>
                    <p>Quotastic karma</p>
                    <p className='text-md'>{karmaCount}</p>
                </div>
            </div>
        </div>
    
      )
}

export default ProfileData