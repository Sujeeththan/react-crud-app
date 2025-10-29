
import {Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import UserList from './pages/users/UserList'
import UserForm from './pages/users/UserForm'
import UserView from './pages/users/UserView'
import UserModal from './pages/UserModal'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/users" />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/new' element={<UserForm />} />
        <Route path='/users/:id/edit' element={<UserForm />} />
        <Route path='/users/:id' element={<UserView />} />
        <Route path='/user-model' element={<UserModal />} />

      </Routes>
    </>
  )
}

export default App
