import React, { useState } from 'react'
import "../../styles/Friends.scss"
import Context from '../../context';
import { useContext } from 'react';
import { updateUser, getUsers } from '../../firebase-users'

function Friend(props) {

const [infoButton, setInfoButton] = useState(false)

let [user, setUser] = useContext(Context)
let friend = null

    const findFriend = async () => {
    await getUsers().then((data) => data.map(userFriend => {
      if(userFriend.username === props.friend) {
        friend = userFriend
      }
    }))
  }

    const handleDelete = async(e) => {
        e.preventDefault()
        await findFriend()
        //console.log(friend)
        props.changeName("1")
        let newFriends = user.friends?.filter(friend => {
           // console.log(friend, props.friend)
            if (friend != props.friend) {
                return friend
            }
        })
        let friendFriends = friend.friends?.filter(friend => {
            console.log(friend, user.username)
            if (friend != user.username) {
                return friend
            }
        })
       // console.log(newFriends, friendFriends)
        props.setFriends(newFriends)
        let newUser = user
        newUser.friends = newFriends
        setUser(newUser)
        let newFriend = friend
        newFriend.friends = friendFriends
        updateUser(user.id, newUser)
        updateUser(friend.id, newFriend)
       // console.log(user, friend)
        props.setUser(newUser)
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