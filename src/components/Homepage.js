import React, { useContext } from 'react'
import Context from '../context'

function Homepage() {

  const user = useContext(Context)

  return (
    <div>Homepage</div>
  )
}

export default Homepage