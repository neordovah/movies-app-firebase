import React, { useEffect, useState } from 'react'
import "../styles/Friends.scss"
import Friend from './pages-components/Friend'
import { getUsers, updateUserFriends } from '../firebase-users'
import { getCookie, setCookie } from '../handle-user-cookie'

function Friends() {

  const user = getCookie()
  const [users, setUsers] = useState([])
  const [friends, setFriends] = useState(user.friends)
  const [friend, setFriend] = useState("")

  useEffect(() => {
    getUsers().then(data => {
      setUsers(data)
    })
  }, [])

  const handleFindFriend = (e) => {
    e.preventDefault()
    if(friend !== "") {
      let foundFriend = 0
      users.map(user => {
        if(friend === user.username) {
          foundFriend = 1
          user.sentFriendReq.push(friend)
          setCookie(user)
        }
      })
      if(foundFriend === 1) {
        //setFriends()
        //updateUserFriends()
      }
    }
  }
  

  return (
    <div className='pageFriends'>
      <span className='addFriend'>
        <h3>Add friend:</h3>
        <input name="friend" value={friend} autoComplete="off" onChange={(e) => setFriend(e.target.value)} placeholder='Enter a username'/>
        <button onClick={(e) => handleFindFriend(e)}>Send friend request</button>
      </span>
      <div className='friends'>
        {user.friends?.map(friend => {
          return (
            <>
            <Friend key={friend} friend={friend} setFriends={setFriends}/></>
          )
        })}
      </div>
    </div>
  )
}

export default Friends