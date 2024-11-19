import React, { useState, useEffect } from 'react';
import styles from './MessageBox.module.css'; // Import the CSS module
import defaultProfilePic from './def_user_profile.png'; // Import the default profile picture
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons

function MessageBox() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(''); // Fixed typo here
  const [fileInput, setFileInput] = useState(null);
  const [fileName, setFileName] = useState('');

  const sendMessage = () => { // Fixed arrow function syntax
    if (messageInput.trim() !== '') {
      setMessages([...messages, { type: 'text', content: messageInput, user: 'user1' }]);
      setMessageInput('');
      setFileName('');
    }

    if (fileInput) {
      const file = fileInput;
      let content = URL.createObjectURL(file);
      let type = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document';
      setMessages([...messages, { type, content, user: '' }]);
      setFileInput(null);
      setFileName('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Fixed to access the first file
    if (file) {
      setFileInput(file);
      setFileName(file.name);
      setMessageInput(file.name);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat box when a new message is added
    const chatBox = document.querySelector(`.${styles.messageboxChatBox}`);
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.messageboxChatContainer}>
      <ChatHeader />
      <ChatBox messages={messages} />
      <ChatInput 
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        setFileInput={setFileInput}
        fileName={fileName}
        setFileName={setFileName}
        sendMessage={sendMessage}
        handleKeyDown={handleKeyDown}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}

const ChatHeader = () => (
  <div className={styles.messageboxChatHeader}>
    <img 
      src="profile1.jpg"
      onError={(e) => e.target.src = defaultProfilePic}
      alt="User Profile" 
      className={styles.messageboxProfilePic} 
    />
    <span className={styles.messageboxUserName}>Chetan</span>
  </div>
);

const ChatBox = ({ messages }) => (
  <div className={styles.messageboxChatBox}>
    {messages.map((msg, index) => (
      <div key={index} className={`${styles.messageboxMessage} ${styles['messagebox' + msg.user]}`}>
        {msg.type === 'text' && <p>{msg.content}</p>}
        {msg.type === 'image' && <img src={msg.content} alt="Sent Image" />}
        {msg.type === 'video' && <video key={index} src={msg.content} controls />}
        {msg.type === 'document' && <a href={msg.content} target="_blank" rel="noopener noreferrer">View Document</a>}
      </div>
    ))}
  </div>
);

const ChatInput = ({ messageInput, setMessageInput, setFileInput, fileName, setFileName, sendMessage, handleKeyDown, handleFileChange }) => {

  return (
    <div className={styles.messageboxChatInput}>
      <input 
        type="text" 
        placeholder={fileName ? '' : 'Type a message...'} 
        value={messageInput} 
        onChange={(e) => setMessageInput(e.target.value)} 
        onKeyDown={handleKeyDown}
      />
      <input 
        type="file" 
        accept="image/*,video/*,.pdf" 
        id="file-input" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      <label htmlFor="file-input" className={styles.messageboxFileUploadIcon}>
        <FaPlus />
      </label>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageBox;
