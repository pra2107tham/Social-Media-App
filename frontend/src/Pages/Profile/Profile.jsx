import React from 'react'
import ProfileLeft from '../../Components/ProfileLeft/ProfileLeft'
import RightSide from '../../Components/RightSide/RightSide'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import PostSide from '../../Components/PostSide/PostSide'

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileLeft />
      <div className='Profile-center'>
        <ProfileCard />
        <PostSide />
      </div>
      <RightSide />
    </div>
  )
}

export default Profile