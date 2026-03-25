import { useState } from 'react'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateProject from './pages/CreateProject'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProjects from './pages/MyProject'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/project/create' element={<CreateProject />} />
      <Route path='/project' element={<MyProjects />} />
    </Routes>
    </>
  )
}

export default App
