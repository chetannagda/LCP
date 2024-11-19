import React from 'react';
import './ConversationList.css';
import ConversationItem from './ConversationItem';

const ConversationList = ({ conversations, deleteConversation }) => (
  <div className="conversation-list">
    {conversations.map(convo => (
      <ConversationItem 
        key={convo.id}
        conversation={convo}
        deleteConversation={deleteConversation}
      />
    ))}
  </div>
);

export default ConversationList;
