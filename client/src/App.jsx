import { useState } from 'react'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateProject from './pages/CreateProject'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProjects from './pages/MyProject'
import MyTeams from './pages/MyTeams'

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
      <Route path='/teams' element={<MyTeams />} />
    </Routes>
    </>
  )
}

export default App
