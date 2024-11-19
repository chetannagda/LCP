import React, { useState, useRef } from 'react';
import styles from './Consultancy.module.css'; // Import the CSS module
import consultPhoto from './assets/images/consult.png'; // Import the consultant photo

const Consultancy = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [userName, setUserName] = useState('');
    const [step, setStep] = useState(0); // To track the step of the conversation
    const textAreaRef = useRef(null);

    const sendMessage = () => {
        if (input.trim() === '') return;

        const newUserMessage = { 
            text: input, 
            from: 'user' // No name needed here
        };
        setMessages([...messages, newUserMessage]);
        setInput('');

        // Reset textarea height after sending
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "40px";
        }

        if (step === 0) {
            setStep(1);
            // Simulate response after 2 seconds
            setTimeout(() => {
                const autoResponse = "Thanks for connecting. May I know your name?";
                const responseMessage = { 
                    text: autoResponse, 
                    from: 'bot', 
                    name: 'Consultant',
                    profilePicture: consultPhoto // Use the consultant photo
                };
                setMessages(prev => [...prev, responseMessage]);
            }, 2000);
        } else if (step === 1) {
            setUserName(input);
            setStep(2);
            // Simulate response after 2 seconds
            setTimeout(() => {
                const autoResponse = `Hi ${input}, tell me what I can help you with. Describe your issue.`;
                const responseMessage = { 
                    text: autoResponse, 
                    from: 'bot', 
                    name: 'Consultant',
                    profilePicture: consultPhoto // Use the consultant photo
                };
                setMessages(prev => [...prev, responseMessage]);
            }, 2000);
        } else if (step === 2) {
            setStep(3);
            // Simulate final response after 2 seconds
            setTimeout(() => {
                const autoResponse = "Thank you for your response. We will consider your problem and provide a solution shortly.";
                const responseMessage = { 
                    text: autoResponse, 
                    from: 'bot', 
                    name: 'Consultant',
                    profilePicture: consultPhoto // Use the consultant photo
                };
                setMessages(prev => [...prev, responseMessage]);
            }, 2000);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto"; // Reset height
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust height based on content
        }
    };

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${styles[msg.from]}`}>
                        {msg.from === 'bot' && (
                            <img 
                                src={msg.profilePicture} 
                                alt={`${msg.name}'s profile`} 
                                className={styles.profilePicture} 
                            />
                        )}
                        <div className={styles.messageContent}>
                            {msg.from === 'bot' && <div className={styles.messageName}>{msg.name}</div>}
                            <div className={styles.messageText}>{msg.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <textarea
                    ref={textAreaRef}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className={styles.inputField}
                    rows="1" // Set initial rows for minimal height
                />
                <button onClick={sendMessage} className={styles.sendButton}>Send</button>
            </div>
        </div>
    );
};

export default Consultancy;
