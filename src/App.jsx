import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Auth/Register';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} /> */}
          <Route path="/dashboard" element={
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
