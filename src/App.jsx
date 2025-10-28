
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import UserList from './pages/users/UserList'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/users" />} />
        <Route path='/users' element={<UserList />} />
      </Routes>
    </>
  )
}

export default App
