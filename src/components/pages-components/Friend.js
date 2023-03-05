import React, { useState } from 'react'
import "../../styles/Friends.scss"
import { updateUserFriends } from '../../firebase-users'
import { getCookie, setCookie } from '../../handle-user-cookie'

function Friend(props) {

const [infoButton, setInfoButton] = useState(false)

    let user = getCookie()

    const handleDelete = (e) => {
        e.preventDefault()

        let friends = user.friends.filter(friend => {
            if (friend !== props.friend) {
                return friend
            }
        })
        props.setFriends(friends)
        user = {...user, friends}
        setCookie(user)
        updateUserFriends(user.id, friends)

    }

  return (
    <div className='friend'>
        <span className="initialInfo">
            <h2>{props.friend}</h2>
            <button onClick={() => setInfoButton(!infoButton)}>info</button>
            <button onClick={(e) => handleDelete(e)}>delete</button>
        </span>
        {infoButton ? 
            <div>
                <p>Username:</p>
                <p>Friend since:</p>
                <p>Recommended you:</p>
                <p>You recommended them:</p>
            </div>
        :null}
    </div>
  )
}

export default Friend