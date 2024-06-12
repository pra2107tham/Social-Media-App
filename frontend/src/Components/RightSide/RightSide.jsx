import React from 'react'
import "./RightSide.css"
import FollowersCard from '../FollowersCard/FollowersCard'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import { useState } from 'react'


const RightSide = () => {

  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="RightSide">
      <FollowersCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      <TrendCard />
    </div>
  )
}

export default RightSide