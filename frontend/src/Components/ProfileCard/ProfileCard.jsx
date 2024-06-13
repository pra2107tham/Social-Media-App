import React, { useEffect } from 'react'
import Cover from "../../assets/cover.jpg"
import Profile from "../../assets/profileImg.jpg"
import "./ProfileCard.css"
import axios from 'axios'
import { useState } from 'react'

const ProfileCard = () => {
  const [profileData,setProfileData] = useState({})

  const fetchInfo = async () => {
    const formData = {
      userID : localStorage.getItem('userID')
    }
    const response = await axios.post('/api/profile/data',formData)
    console.log(response)
    console.log("Fetching Profile Data",response.data)
    if(response.status === 200){
      setProfileData(response.data)
    }else{
      console.log("Error in fetching Profile Data", response.error)
    }
    console.log("Profile Data",profileData)
    }
      useEffect( () => {
        fetchInfo()
      },[])
      
  const ProfilePage = true;
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="" />
        <img src={localStorage.getItem("image")} alt="" />
      </div>

      <div className="ProfileName">
        <span>{localStorage.getItem("name")}</span>
      </div>

      <div className="followStatus">
        <div>
          <div className="follow">
            <span>{profileData?.followings}</span>
            <span className="textbased">Followings</span>
          </div>
          {/* <div className="vl"></div> */}
          <div className="follow">
            <span>{profileData?.followers}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              {/* <div className="vl"></div> */}
              <div className="follow">
                <span>{profileData?.posts}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  )
}

export default ProfileCard