import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserView() {
    const [user, setuser] = useState()
    const {id}  = useParams();

     useEffect(() => {
        getOneUser()
     },[])

    const getOneUser = async () => {
        const res = await axios.get(`https://express-mongo-connection-sigma.vercel.app/api/users/${id}`)
       const data = res.data.user
        console.log(data);
        setuser(data)
    };
    if(!user) return <p>Loading...</p>;
    
  return (
    <div>
        <h1>UserView</h1>
        <ul>
            <li><strong>Name:</strong> {user.name}</li>
            <li><strong>Email:</strong>{user.email}</li>
            <li><strong>IsActive:</strong>{user.isActive ? "Yes" : "No"}</li>
        </ul>
    </div>
  )
}

export default UserView