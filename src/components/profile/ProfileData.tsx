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
    <div>
        <div>{user.image}</div>
        <div>{user.first_name} {user.last_name}</div>
        <div>
            <div>
                <p>Quotes</p>
                <p>{quoteCount}</p>
            </div>
            <div>
                <p>User karma</p>
                <p>{karmaCount}</p>
            </div>
        </div>
    </div>

  )
}

export default ProfileData