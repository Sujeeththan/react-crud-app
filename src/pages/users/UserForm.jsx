import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../api/userApi';

function UserForm() {
  const  {id} = useParams();
  const navigate = useNavigate();
  const [user , setuser] = useState({name:"", email:"" , isActive:true});
  const [loading , setLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id])


  const fetchUser = async () => {
    const userData = await getUserById(id);
    setuser(userData)
  }

  const handleChange = (e) => {
     const { name, value, type, checked } = e.target;
    setuser({ ...user, [name]:type === "checkbox" ? checked : value})
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true)
     try {
      if(id) {
        await updateUser(id,user);
        alert("User Update Successfully")
      } else {
        await createUser(user);
        alert("User Create Successfully")
      }
      navigate("/users")
     } finally  {
      setLoading(false)
     }
  };


  return (
    <div className="container">
      <h2>{id ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label> <br />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label> <br />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={user.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UserForm