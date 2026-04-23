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
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import TeamDetails from './pages/TeamDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      
      <Route path='/project' element={<MyProjects />} />
      <Route path='/teams' element={<MyTeams />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/profile/:id' element={<PublicProfile />} />
      <Route path='/events' element={<Explore />} />
      <Route path='/events/:id' element={<Competitions />} />
      <Route path='/find-team/:id' element={<FindTeam />} />
      <Route path='/create-project' element={<CreateProjet />} />

      {/* Skills */}
      <Route path='/skills-test' element={<SkillAssessment />} />
      <Route path='/skills-share' element={<SkillShare />} />

      {/* Notifications */}
      <Route path='/notifications' element={<Notifications />} />

      {/* Team Details */}
      <Route path='/teams/:teamId' element={<TeamDetails />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
