import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import "./message.css";
import axios from "axios";

export default function MessageModal({ receiverId, closeModal }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state);
 
  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getmessage/${receiverId}`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setMessages(res?.data?.messages || []);
    
    } catch (err) {
      console.error("Error fetching messages:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMessages(); 
  }, [receiverId]);

 

  const sendMessageHandler = async () => {
    if (!message.trim()) return; 
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendmessage`,
        {
          receiverId,
          message,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );

      // Add the new message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: {
            _id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
          },
          message,
        },
      ]);
      setMessage(""); 
      
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

 

  return (
    <>
    

      
      <div className="message-modal">
        <div className="message-header" onClick={closeModal}>
          <button onClick={closeModal} className="close-btn">
            Close
          </button>
        </div>
        <div className="message-body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender?._id === user.id ? "sent" : "received"
              }`}
            >
              <p>
                {msg.sender
                  ? `${msg.sender.first_name} ${msg.sender.last_name}: ${msg.message}`
                  : "Loading..."}
              </p>
                    
              <span>
                <Moment fromNow interval={30}>
                {msg.messageAt}
                </Moment>
              </span>  

            </div>
          ))}
        
        </div>
        <div className="message-footer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="message-input"
          />
          <button onClick={sendMessageHandler} className="send-btn">
            Send
          </button>
        </div>
      </div>
      
    </>
  );
}
