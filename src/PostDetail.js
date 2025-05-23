import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function PostDetail({ token }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      })
      .catch(console.error);
  }, [id]);

  const saveEdit = async () => {
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setIsEditing(false);
      const updatedPost = await res.json();
      setPost({ ...post, title, content });
    } else {
      alert('Failed to update post');
    }
  };

  if (!post) return <p>Loading...</p>;

  
  let isAuthor = false;
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    isAuthor = payload.id === post.user_id;
  }

  return (
    <div>
      {isEditing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => setContent(editor.getData())}
          />
          <button onClick={saveEdit}>Save</button>{' '}
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>By {post.username}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          {isAuthor && <button onClick={() => setIsEditing(true)}>Edit Post</button>}
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}

export default PostDetail;
