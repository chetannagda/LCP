import React, { useState } from 'react';
import './VaastuBot.css';

// Comprehensive Vaastu data for all kinds of queries
const vaastuData = {
  directions: {
    north: [
      "North is governed by Kubera, the god of wealth. It is ideal to have open spaces and water sources here to invite prosperity.",
      "Avoid placing heavy objects in the north direction as it may block the flow of positive energy.",
      "A north-facing entrance is considered auspicious and brings financial growth."
    ],
    south: [
      "South is governed by Yama, the god of death. Avoid having the main entrance in the south to prevent negative energy.",
      "It is ideal to place heavy furniture or a bedroom in the south direction for stability and strength.",
      "Having an open space in the south may lead to financial losses."
    ],
    east: [
      "East is associated with Surya, the Sun god, and represents health and vitality. A main entrance or large windows facing east bring good health.",
      "Place your study or office in the east for enhanced focus and productivity.",
      "Avoid placing a bathroom in the east direction, as it may drain positive energy."
    ],
    west: [
      "West is governed by Varuna, the god of water. It is a neutral direction and is best for storage or dining areas.",
      "A west-facing property is considered stable and neutral in terms of energy.",
      "Avoid having a main entrance in the west, as it may lead to delays and obstacles in life."
    ],
  },
  elements: {
    earth: [
      "Earth represents stability and balance. Use earthy tones in the southwest for grounding energy.",
      "Heavy furniture and load-bearing elements should be placed in the southwest to balance the element of Earth."
    ],
    water: [
      "Water represents wealth and flow. Place water elements such as fountains in the northeast to attract prosperity.",
      "Ensure that water bodies, such as swimming pools, are positioned in the north or northeast."
    ],
    fire: [
      "Fire symbolizes energy and transformation. The kitchen should be placed in the southeast, the direction of Agni, the fire god.",
      "Avoid placing fire elements like stoves in the north direction, as this can disrupt wealth flow."
    ],
    air: [
      "Air is crucial for movement and communication. Ensure windows and ventilation are present in the east and northeast to facilitate energy flow.",
      "Avoid blocking airflow in the northeast to maintain a positive balance."
    ],
    space: [
      "Space governs the overall harmony of a property. Ensure a clutter-free environment to allow positive energy flow.",
      "A central open space in the home or office promotes good energy circulation and balance."
    ],
  },
  rooms: {
    livingRoom: [
      "The living room should ideally be located in the north or east to receive maximum natural light.",
      "Avoid placing heavy furniture in the center of the living room as it can block energy flow."
    ],
    bedroom: [
      "The master bedroom should be located in the southwest for stability and relaxation.",
      "Ensure the bed is placed with the head towards the south or east for better sleep and health."
    ],
    kitchen: [
      "The kitchen should be placed in the southeast, governed by the fire element, to balance energy.",
      "Avoid placing the kitchen directly in front of the main entrance to prevent financial instability."
    ],
    bathroom: [
      "Bathrooms should be placed in the west or northwest, away from the kitchen and bedrooms.",
      "Ensure proper ventilation in the bathroom to avoid stagnation of energy."
    ],
    office: [
      "In an office, the owner should sit in the southwest corner, facing north or east for success and growth.",
      "Avoid sitting with your back to the entrance, as it may lead to a lack of support."
    ],
  },
  remedies: [
    "If your entrance is in the south, place a copper pyramid above the door to neutralize negative energy.",
    "To correct a bathroom in the northeast, place a small plant in the bathroom to absorb excess negative energy.",
    "If you have a kitchen in the northwest, use red or yellow colors to balance the fire element."
  ],
  general: [
    "Vaastu is the ancient Indian science of architecture and design, focusing on balancing natural energies.",
    "It is essential to maintain a balance of the five elements—earth, water, fire, air, and space—for optimal energy flow.",
    "A well-designed Vaastu-compliant space promotes health, wealth, and happiness for its occupants."
  ]
};

const VaastuBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState('initial'); // Track the conversation step

  const handleSend = () => {
    if (input.trim() !== '') {
      setMessages([...messages, { text: input, sender: 'user' }]);
      processUserInput(input.trim().toLowerCase());
      setInput('');
    }
  };

  const processUserInput = (userInput) => {
    let response = '';

    if (step === 'initial') {
      if (userInput.includes('direction') || userInput.includes('element') || userInput.includes('room')) {
        response = "Please specify what you want to know about:\n1. Direction (north, south, east, west)\n2. Element (earth, water, fire, air, space)\n3. Room (living room, bedroom, kitchen, bathroom, office)\nFor example, you can type 'direction' to get started.";
        setStep('awaitingCategory');
      } else if (userInput.includes('remedy')) {
        response = getVaastuRemedy();
      } else {
        response = getGeneralVaastuInfo();
      }
    } else if (step === 'awaitingCategory') {
      if (userInput.includes('direction')) {
        response = "Please specify a direction (north, south, east, west).";
        setStep('direction');
      } else if (userInput.includes('element')) {
        response = "Please specify an element (earth, water, fire, air, space).";
        setStep('element');
      } else if (userInput.includes('room')) {
        response = "Please specify a room (living room, bedroom, kitchen, bathroom, office).";
        setStep('room');
      } else {
        response = "I didn't understand that. Please specify one of the following: direction, element, or room.";
      }
    } else if (step === 'direction') {
      if (vaastuData.directions[userInput]) {
        response = getVaastuResponse('directions', userInput);
        setStep('initial'); // Reset step after providing response
      } else {
        response = "Invalid direction. Please choose from (north, south, east, west).";
      }
    } else if (step === 'element') {
      if (vaastuData.elements[userInput]) {
        response = getVaastuResponse('elements', userInput);
        setStep('initial'); // Reset step after providing response
      } else {
        response = "Invalid element. Please choose from (earth, water, fire, air, space).";
      }
    } else if (step === 'room') {
      if (vaastuData.rooms[userInput]) {
        response = getVaastuResponse('rooms', userInput);
        setStep('initial'); // Reset step after providing response
      } else {
        response = "Invalid room. Please choose from (living room, bedroom, kitchen, bathroom, office).";
      }
    }

    // Simulating bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'bot' },
      ]);
    }, 1000);
  };

  const getVaastuResponse = (category, key) => {
    const responses = vaastuData[category][key];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };

  const getVaastuRemedy = () => {
    const randomIndex = Math.floor(Math.random() * vaastuData.remedies.length);
    return vaastuData.remedies[randomIndex];
  };

  const getGeneralVaastuInfo = () => {
    const randomIndex = Math.floor(Math.random() * vaastuData.general.length);
    return vaastuData.general[randomIndex];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>VaastuBot</h2>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default VaastuBot;
