import React, { useState, useEffect } from 'react';
import './chat.css';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Nav';
import Footer from '../components/footer';
import axios from 'axios'; 


const Chat = () => {
  const [placeholder, setPlaceholder] = useState("");
  const word = ["s", "e", "a", "r", "c", "h", " ", "f", "o", "r", " ", "c", "h", "a", "t", "r", "o", "o", "m", "s"];
  const [i, setI] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [messages,setMessages]=useState([]);
  const [sendMessage,setSendMessage]=useState("");

  //for send message
const onChangeSendMessage=(e)=>{
  console.log(sendMessage)
  setSendMessage(e.target.value)
}

useEffect(()=>{
  const messagesURL='http://localhost:5000/api/v1/messages/allMessages'
  
  const fetching=async()=>{
    try {
      const data=await axios.get(messagesURL,{timeout:5000});
      let Datamessages=data.data;
      console.log(Datamessages);

      //make sure it is empty
      setMessages([]);
      
      setMessages((prevMessage)=>[
        ...prevMessage,...Datamessages.map((item)=>item.message.text)
      ])
      

    } catch (error) {
      console.log(error)
    }
  }
  fetching()
},[])



  useEffect(() => {
  const intervalId = setInterval(() => {
    // Your existing code
  }, 100);

  return () => clearInterval(intervalId);
}, [i, word, shouldContinue]); // Remove setI and setPlaceholder from the dependency array



 const addMessage = async(e) => {
  e.preventDefault();
 
     try {
      const see=await axios.post('http://localhost:5000/api/v1/messages/add',{
    from:"65bbe4a029da132ca2527fcd",
    message:sendMessage})

       setMessages((prevMessage)=>[
        ...prevMessage,sendMessage
       ])
       setSendMessage("");
        
     } catch (error) {
      console.log(error);
     }
     
}

  return (
    <>
    <div className="chatMain">
      <header className='header1'><Navbar></Navbar></header>
      <div className="chatContainer">
        <div className='chatRoomSection'>
          <div className="chatSearchSection">
            <input className='chatRoomSearchBtn' type="text" placeholder={placeholder} />
            <button className='createNewRoomBtn'>+</button>
          </div>
          <div className="displayChatRooms">
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
            <div className='chatRoom'>
              <a href="">name1</a>
            </div>
          </div>
        </div>
        <div className="chatMessagesSection">
          <div className="chatRoomName">name</div>
          <div className="messagesDisplayArea">
               {messages.map((message, index) => (
                 <a key={index} className="chatMessageUser">
                   {message}
                 </a>
               ))}
          </div>

          <div className="messagesSendOption">
            <input className="sendMessageInput"type="text" value={sendMessage} onChange={onChangeSendMessage}/>
            <button className="sendMessageBtn" onClick={addMessage}>Send</button>
          </div>
        </div>
      </div>
      <footer className='footer'><Footer></Footer></footer>
      </div>
    </>
  );
}

export default Chat;
