import React, { useEffect, useState } from 'react'
import './FollowersCard.css'

const FollowersCard = () => {
    const [users,setUsers] = useState([]);
    const [unfollow,setUnfollow] = useState([]);

    const fetchUsers = async () => {
        const response = await axios.get('/users/fetchUsers');
        console.log("all users", response.json());
        setUsers(response.json());
    }
    useEffect(()=> {
        fetchUsers();
        setUnfollow(localStorage.getItem('followersList'))
    },[])

    const handleFollow = async (followerID) => {
        const formData = {
            userID : localStorage.getItem('userID'),
            followerID: followerID._id
        }

        const response = await axios.post('/profile/follow',formData);
        const userData = response.json();
        setUnfollow(userData.followersList);
        localStorage.setItem('followersList',userData.followersList);
        console.log("Posting.... info reponse",userData);

    }

  return (
    <div className="FollowersCard">
            <h3>People you may follow</h3>

            {users.length > 0 ? users.filter(item=>!localStorage.getItem("name").startsWith(item.firstName)).map((follower, id) => {
                return (
                    <div className="follower" key={id}>
                        <div>
                            <img src={follower.img} alt="" className='followerImage' />
                            <div className="name">
                                <span>{follower.firstName}</span>
                                <span>@{follower.username}</span>
                            </div>
                        </div>
                        <button className='button fc-button' onClick={() => handleFollow(follower)}>
                           {unfollow?.includes(follower._id) ? 'Unfollow' : 'Follow'} 
                        </button>
                    </div>
                )
            }) : null}
        </div>
  )
}

export default FollowersCard