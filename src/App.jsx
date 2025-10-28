
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import UserList from './pages/users/UserList'

function App() {

  return (
    <>
      <Routes>
        <Route path='/users' element={<UserList />} />
      </Routes>
    </>
  )
}

export default App
