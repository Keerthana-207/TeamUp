import { useState } from 'react'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Login from './pages/Login'
// import CreateProject from './pages/CreateProject'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MyProjects from './pages/MyProject'
import MyTeams from './pages/MyTeams'
import Dashboard from './pages/Dashboard'
import PublicProfile from './pages/PublicProfile'
import Competitions from './pages/Competitions'
import FindTeam from './pages/FindTeam'
import CreateProjet from './pages/CreateProject'
import SkillAssessment from './pages/SkillAssessment'
import Explore from './pages/Explore'
import SkillShare from './pages/SkillShare'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/my-profile' element={<Profile />} />
      {/* <Route path='/project/create' element={<CreateProject />} /> */}
      <Route path='/project' element={<MyProjects />} />
      <Route path='/teams' element={<MyTeams />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/profile' element={<PublicProfile />} />
      <Route path='/events' element={<Explore />} />
      <Route path='/events/:id' element={<Competitions />} />
      <Route path='/find-team/:id' element={<FindTeam />} />
      <Route path='/create-project' element={<CreateProjet />} />
      <Route path='/skills-test' element={<SkillAssessment />} />
      <Route path='/skills-share' element={<SkillShare />} />
    </Routes>
    </>
  )
}

export default App
