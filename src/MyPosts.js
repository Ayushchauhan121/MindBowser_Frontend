import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/posts', {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => {
      
        const payload = JSON.parse(atob(token.split('.')[1]));
        setPosts(data.filter(post => post.user_id === payload.id));
      })
      .catch(console.error);
  }, [token]);

  const deletePost = async id => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });
    if (res.ok) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div>
      <h2>My Posts</h2>
      {posts.length === 0 && <p>You have no posts.</p>}
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
          <Link to={`/post/${post.id}`}><h3>{post.title}</h3></Link>
          <button onClick={() => navigate(`/post/${post.id}`)}>Edit</button>{' '}
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
