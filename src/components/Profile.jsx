import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((store) => store.user)
  if (!user) {
    return <div className="flex justify-center mt-10">Loading...</div>
  }

  return (
    user && (<>
      <EditProfile user={user} />
    </>)
  )
}

export default Profile