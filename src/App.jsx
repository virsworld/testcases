import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import APS105 from './pages/home/aps105/aps105';
import ECE244 from './pages/Home/ECE244/ECE244';
import About from './pages/about/about';
import Login from './pages/Login/Login';

const routes = (
  <Router> 
    <Routes>
      <Route path="/" exact element={<Login />}/>
      {/* <Route path="/dashboard" exact element={<Dashboard />}/> */}
      <Route path="/home" exact element={<Home />}/>
      <Route path="/home/aps105" exact element={<APS105 />}/>
      <Route path="/home/ece244" exact element={<ECE244 />}/>
      <Route path="/about" exact element={<About />}/>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
