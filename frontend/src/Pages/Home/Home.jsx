import React, { useEffect } from 'react'
import ProfileSide from '../../Components/ProfileSide/ProfileSide'
import PostSide from '../../Components/PostSide/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('userID')) {
      navigate('/')
    }},[])
  return (
    <div  className='Home'>
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  )
}

export default Home