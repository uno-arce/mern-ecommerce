// Pages
import Register from './pages/Register.js';
import Login from './pages/Login.js';

// Routing
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {useState, useEffect} from 'react';

function App() {
  return (

      <Router>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>

  );
}

export default App;
