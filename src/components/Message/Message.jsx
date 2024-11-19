import React, { useState } from 'react';
import './Message.css';
import ConversationList from './ConversationList';

function Message() {
  const initialConversations = [
    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

    {
      id: 1,
      name: 'Govind Prasad Nagda',
      photo: './def_user_profile.png',
      lastMessage: 'Hey, how are you?',
      isUnread: true,
    },

  ];

  const [conversations, setConversations] = useState(initialConversations);

  const deleteConversation = (id) => {
    setConversations(conversations.filter(convo => convo.id !== id));
  };

  return (
    <div className="message-app">
      <h1>Messages</h1>
      <ConversationList 
        conversations={conversations}
        deleteConversation={deleteConversation}
      />
    </div>
  );
}

export default Message;
