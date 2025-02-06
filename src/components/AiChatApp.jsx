import React, { useEffect, useRef, useState } from 'react';
import './styles/AiChatApp.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ModalCharacterSelection from './ModalCharacterSelection';
import Overlay from './Overlay';
import ReactMarkdown from 'react-markdown'

function AiChatApp() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [messages, setMessages] = useState([]);
  const [inputs, setInputs] = useState("");
  const [modal, setModal] = useState(false);
  const [aiPrompts, setAiPrompts] = useState({
    name:"",
    preset:"",
    customPrompts:""
  });
 
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
    systemInstruction: !aiPrompts.customPrompts 
    ? `You are a human and your name is ${aiPrompts.name} you have a preset of ${aiPrompts.preset} ,`
    : aiPrompts.customPrompts
  });

  const initialChatHistory = [
    {
      role: "user",
      parts: [{ text: "hello" }],
    },
    {
      role: "model",
      parts: [{ text: "great to meet you" }],
    },
  ];
  const chat = model.startChat({ history: initialChatHistory });
  const handleInput = async () => {
    if (!inputs.trim()) return; // Prevent sending empty messages
    const result = await chat.sendMessage(inputs);
    const newMessages = [...messages, { user: inputs, bot: result.response.text() }];
    setMessages(newMessages);
    setInputs("");
  };
 
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  

  const handlePrompts = (e)=> {
    const {name, value} = e.target;
    setAiPrompts((propsData) => ({...propsData,[name]: value,}));
  };
  
  return (
    <div className='main-wrapper'>
      <div className='chat-app'>
        <h1>Ai Chat App</h1>
        <p>chat with AI, edit characteristic <strong>AI-bot</strong></p>
        <div className='chat-app-wrapper'>
         
          {messages.map((chatHistory, index) => (
            <div key={index} className='convo'>
              <div className='user-message-wrapper'>
                <div style={{color: "red"}} className='user-message'>{chatHistory.user}</div>
              </div>
              <div className='bot-message-wrapper'>
                <div className='bot-message'><ReactMarkdown>{chatHistory.bot}</ReactMarkdown></div>
              </div>
            </div>
          ))}
          
          <div ref={messagesEndRef} />
         
        </div>
      </div>
    
      <div className='chat-app-footer'>
        <div className='input-area'> 
          <input 
            type="text" 
            onChange={(e) => setInputs(e.target.value)} 
            value={inputs} 
            placeholder="Type your message here..."
          />
          <button onClick={handleInput}>Chat</button>
          <div>
            <p onClick={()=> setModal(true) }>Customize</p>
          </div>
        </div>
      </div>
      
      {modal && 
        <ModalCharacterSelection 
          setModal={setModal} 
          handlePrompts={handlePrompts}
          aiPrompts={aiPrompts}
        />
      }

      {modal && <Overlay/>}

    </div>
    
  );
}

export default AiChatApp;
