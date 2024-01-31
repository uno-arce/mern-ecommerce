// Pages
import AppNavbar from './components/AppNavbar.js';

import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';

// Routing
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {useState, useEffect} from 'react';

import {UserProvider} from './UserContext.js';

function App() {
  const [user, setUser] = useState({
    id: null,
    role: null
  })

  const unSetUser = () => {
    setUser({
      id: null,
      roll: null
    });
    localStorage.clear()
  }

  useEffect(() => {
    fetch('http://ec2-3-16-181-70.us-east-2.compute.amazonaws.com/b2/users/details', {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(result => result.json())
    .then(data => {
      if(typeof data._id !== 'undefined') {
        setUser({
          id: data._id,
          role: data.role
        })
      } else {
        setUser({
          id: null,
          role: null
        })
      }
    })
  }, [])

  return (
    <UserProvider value = {{user, setUser, unSetUser}}>
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
