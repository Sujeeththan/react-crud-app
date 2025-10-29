import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById } from '../../api/userApi';

function UserView() {
    const [user, setuser] = useState()
    const {id}  = useParams();

     useEffect(() => {
        fetchUser()
     },[])

    const fetchUser = async () => {
        const res = await getUserById(id);
       const data = res.data.user
        console.log(data);
        setuser(data)
    };
    if(!user) return <p>Loading...</p>;
    
  return (
    <div>
        <h1>UserView</h1>
        <p>
           <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
           <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
        </p>

        <Link to="{`/users/${user._id}/edit`}">Edit</Link> |{" "}
        <Link to="/users">Back to List</Link>
    
    </div>
  )
}

export default UserView