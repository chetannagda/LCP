import React, { useState, useEffect } from 'react';
import './ConversationItem.css';

const ConversationItem = ({ conversation, deleteConversation }) => {
  const [longPress, setLongPress] = useState(false);

  useEffect(() => {
    let timer;
    if (longPress) {
      timer = setTimeout(() => {
        setLongPress(false);
        if (conversation && conversation.id) {
          deleteConversation(conversation.id);
        }
      }, 800); // 800ms long press duration
    }
    return () => clearTimeout(timer); // Fixed clearTimeout usage
  }, [longPress, conversation, deleteConversation]);

  const handleMouseDown = () => setLongPress(true); // Fixed function name to handleMouseDown
  const handleMouseUp = () => setLongPress(false);
  const handleMouseLeave = () => setLongPress(false); // Added missing function

  if (!conversation) {
    return null; // Return null if conversation is undefined
  }

  return (
    <div 
      className="conversation-item"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave} // Fixed event handler name
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <img 
        src={conversation.photo || 'default.jpg'} // Provide a default image if none is provided
        alt={conversation.name || 'Default Name'} // Provide a default alt text
        className="conversation-photo" 
      />
      <div className="conversation-details">
        <span className="conversation-name">{conversation.name || 'Unknown'}</span>
        <span className={`conversation-message ${conversation.isUnread ? 'unread' : ''}`}>
          {conversation.lastMessage || 'No message'} // Provide a default message if none is provided
        </span>
      </div>
    </div>
  );
};

export default ConversationItem;
