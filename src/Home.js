import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
          <Link to={`/post/${post.id}`}><h3>{post.title}</h3></Link>
          <p>By {post.username}</p>
          <p>{post.content.substring(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
