import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import NewPost from './NewPost';
import MyPosts from './MyPosts';
import PostDetail from './PostDetail';
import "./App.css"
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{' '}
        {token ? (
          <>
            <Link to="/new">New Post</Link> | <Link to="/myposts">My Posts</Link> |{' '}
            <button onClick={logout}>Logout ({username})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/new"
          element={token ? <NewPost token={token} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/myposts"
          element={token ? <MyPosts token={token} /> : <Navigate to="/login" replace />}
        />
        <Route path="/post/:id" element={<PostDetail token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
