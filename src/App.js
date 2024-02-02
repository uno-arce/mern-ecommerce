// Pages
import AppNavbar from './components/AppNavbar.js';

import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Dashboard from './pages/Dashboard.js';
import AddProduct from './pages/AddProduct.js';
import EditProduct from './pages/EditProduct.js';
import Shop from './pages/Shop.js';
import ViewProduct from './pages/ViewProduct.js';

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

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetch('http://ec2-3-16-181-70.us-east-2.compute.amazonaws.com/b2/users/details', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(result => result.json())
      .then(data => {
        if (typeof data._id !== 'undefined') {
          setUser({
            id: data._id,
            role: data.role
          });
        } else {
          setUser({
            id: null,
            role: null
          });
        }
      });
    } else {
      // Handle the case when there is no token in local storage
      setUser({
        id: null,
        role: null
      });
    }
  }, []);

  return (
    <UserProvider value = {{user, setUser, unSetUser}}>
      <Router>
        <AppNavbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/addProduct' element={<AddProduct/>}/>
          <Route path='/editProduct/:productId' element={<EditProduct/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/view/:productId' element={<ViewProduct/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
