// import React, { useState, useContext } from 'react';
// import './OpenForum.css';

// // Example: Let's assume the user's name is coming from an authentication context
// const AuthContext = React.createContext({ username: 'John Doe' });

// function OpenForum() {
//   const [posts, setPosts] = useState([]);
//   const { username } = useContext(AuthContext); // Get the logged-in user's name

//   const addPost = (text) => {
//     const newPost = {
//       id: posts.length + 1,
//       username, // Use the logged-in user's name
//       text,
//       timestamp: new Date(), // Add current date and time
//       replies: [],
//     };
//     // Prepend the new post to the array
//     setPosts([newPost, ...posts]); // Ensure newest post is first
//   };

//   const addReply = (postId, replyText) => {
//     const newReply = {
//       id: posts.find((post) => post.id === postId).replies.length + 1,
//       text: replyText,
//       timestamp: new Date(), // Add current date and time to reply
//     };

//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? { ...post, replies: [newReply, ...post.replies] } // Prepend the new reply
//           : post
//       )
//     );
//   };

//   return (
//     <div className="OpenForum-container">
//       <h1>Public Forum</h1>
//       <h3>Post Your Problem and Let People Help YOU || or || Lets HELP People with their Problem</h3>

//       {/* Post Form to Add New Posts */}
//       <PostForm addPost={addPost} />

//       <div className="OpenForum-postList">
//         {/* Render each post in reverse order */}
//         {posts.length === 0 ? (
//           <p>No posts yet. Be the first to post something!</p>
//         ) : (
//           posts.map((post) => (
//             <Post key={post.id} post={post} addReply={addReply} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// function PostForm({ addPost }) {
//   const [text, setText] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text) return;
//     addPost(text);
//     setText(''); // Clear text after submitting
//   };

//   return (
//     <form onSubmit={handleSubmit} className="OpenForum-form">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="OpenForum-textarea"
//         placeholder="Write something..."
//       />
//       <button type="submit" className="OpenForum-button">Post</button>
//     </form>
//   );
// }

// function Post({ post, addReply }) {
//   const [replyText, setReplyText] = useState('');
//   const [showReplyForm, setShowReplyForm] = useState(false);

//   const handleReplySubmit = (e) => {
//     e.preventDefault();
//     if (!replyText) return;
//     addReply(post.id, replyText);
//     setReplyText('');
//     setShowReplyForm(false);
//   };

//   // Format the date and time
//   const formatDate = (timestamp) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   return (
//     <div className="OpenForum-postContainer">
//       <h4>{post.username}</h4> {/* Display the username from the post */}
//       <p>{post.text}</p>
//       <small>Posted on: {formatDate(post.timestamp)}</small>

//       {/* Button to show reply form */}
//       <button onClick={() => setShowReplyForm(!showReplyForm)} className="OpenForum-button">
//         {showReplyForm ? 'Cancel Reply' : 'Reply'}
//       </button>

//       {showReplyForm && (
//         <form onSubmit={handleReplySubmit} className="OpenForum-replyForm">
//           <input
//             type="text"
//             value={replyText}
//             onChange={(e) => setReplyText(e.target.value)}
//             placeholder="Write your reply..."
//             className="OpenForum-replyInput"
//           />
//           <button type="submit" className="OpenForum-button">Submit Reply</button>
//         </form>
//       )}

//       {/* Display replies */}
//       {post.replies.length > 0 && (
//         <div className="OpenForum-replies">
//           <h4>Replies:</h4>
//           {post.replies.map((reply) => (
//             <div key={reply.id}>
//               <p className="OpenForum-reply">{reply.text}</p>
//               <small>Replied on: {formatDate(reply.timestamp)}</small>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default OpenForum;


import React, { useState, useContext } from 'react';
import './OpenForum.css';

const AuthContext = React.createContext({ username: '' });

function OpenForum() {
  const [posts, setPosts] = useState([]);
  const { username } = useContext(AuthContext);

  const addPost = (text) => {
    const newPost = {
      id: posts.length + 1,
      username,
      text,
      timestamp: new Date(),
      replies: [],
    };
    setPosts([newPost, ...posts]);
  };

  const addReply = (postId, replyText) => {
    const newReply = {
      id: posts.find((post) => post.id === postId).replies.length + 1,
      text: replyText,
      timestamp: new Date(),
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, replies: [newReply, ...post.replies] }
          : post
      )
    );
  };

  return (
    <div className="op-open-forum-container">
      <div className="op-header">
        <h1>Public Forum</h1>
        <h3>Post Your Problem and Let People Help YOU || or || Let's HELP People with their Problem</h3>
      </div>
      <div className="op-forum-description">
        <p>Welcome to our vibrant community forum! Here, you can share your challenges, seek advice, and offer solutions to others. Together, we create a supportive environment for problem-solving and idea-sharing.</p>
      </div>

      <PostForm addPost={addPost} />

      <div className="op-post-list">
        {posts.length === 0 ? (
          <div className="op-no-posts">
            <p>No posts yet. Be the first to post something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} addReply={addReply} />
          ))
        )}
      </div>
    </div>
  );
}

function PostForm({ addPost }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addPost(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="op-post-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="op-post-textarea"
        placeholder="Share your problem or idea..."
      />
      <button type="submit" className="op-post-button">Post</button>
    </form>
  );
}

function Post({ post, addReply }) {
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText) return;
    addReply(post.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="op-post-container">
      <h4>{post.username}</h4>
      <p className="op-post-content">{post.text}</p>
      <small className="op-post-timestamp">Posted on: {formatDate(post.timestamp)}</small>

      <button onClick={() => setShowReplyForm(!showReplyForm)} className="op-reply-button">
        {showReplyForm ? 'Cancel Reply' : 'Reply'}
      </button>

      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="op-reply-form">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
            className="op-reply-input"
          />
          <button type="submit" className="op-reply-button">Submit Reply</button>
        </form>
      )}

      {post.replies.length > 0 && (
        <div className="op-replies">
          <h4>Replies:</h4>
          {post.replies.map((reply) => (
            <div key={reply.id} className="op-reply">
              <p>{reply.text}</p>
              <small>Replied on: {formatDate(reply.timestamp)}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OpenForum;