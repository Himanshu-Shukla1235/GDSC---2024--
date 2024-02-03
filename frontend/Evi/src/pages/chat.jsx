import React, { useState, useEffect } from 'react';
import './chat.css';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Nav';
import Footer from '../components/footer';

const Chat = () => {
  const [placeholder, setPlaceholder] = useState("");
  const word = ["s", "e", "a", "r", "c", "h", " ", "f", "o", "r", " ", "c", "h", "a", "t", "r", "o", "o", "m", "s"];
  const [i, setI] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!shouldContinue) {
        clearInterval(intervalId); // Stop the interval permanently
        return;
      }

      setPlaceholder((prevPlaceholder) => prevPlaceholder + word[i]);
      setI((prevI) => prevI + 1);

      if (i === word.length - 1) {
        setPlaceholder(placeholder);
        setShouldContinue(false); // Set shouldContinue to false to stop the interval permanently
      }
    }, 100);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [i, word, shouldContinue]);

  return (
    <>
    <div className="chatMain">
      <header className='header1'><Navbar></Navbar></header>
      <div className="chatContainer">
        <div className='chatRoomSection'>
          <div className="chatSearchSection">
            <input type="text" placeholder={placeholder} />
          </div>
          <div className="displayChatRooms">
            display room
          </div>
        </div>
        <div className="chatMessagesSection">
          <div className="chatRoomName">name</div>
          <div className="messagesDisplayArea">messages</div>
          <div className="messagesSendOption">send</div>
        </div>
      </div>
      <footer className='footer'><Footer></Footer></footer>
      </div>
    </>
  );
}

export default Chat;
