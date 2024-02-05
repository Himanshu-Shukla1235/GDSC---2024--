import React, { useState, useEffect } from 'react';
import './chat.css';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Nav';
import Footer from '../components/footer';
import axios from 'axios'; 
import CloseIcon from '@mui/icons-material/Close';


const Chat = () => {
  const [placeholder, setPlaceholder] = useState("");
  const word = ["s", "e", "a", "r", "c", "h", " ", "f", "o", "r", " ", "c", "h", "a", "t", "r", "o", "o", "m", "s"];
  const [i, setI] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [messages,setMessages]=useState([]);
  const [sendMessage,setSendMessage]=useState("");
  const [searchRoom,setSearchRoom]=useState("");
  const [roomFormClass,setRoomFormClass]=useState("createRoom");

  //for send message
const onChangeSendMessage=(e)=>{
  console.log(sendMessage)
  setSendMessage(e.target.value)
}

const onchangeRoom=async(e)=>{
  setSearchRoom(e.target.value)
  console.log(searchRoom)

  const res=await axios.get('http://localhost:5000/api/v1/chat/search',{
    params:{
      name:searchRoom,
      location:"searchRoom"
    }
  });
  console.log(res);
 
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

// cretaeing form
const openCreateRoomForm=()=>{
  setRoomFormClass("clickedCreateRoom");
}

//crreaing new room
const [aimC,setAimC]=useState('')
const [nameC,setNameC]=useState('')
const [areaC,setAreaC]=useState('')
const [disC,setDisC]=useState('')
const [creatRoomError,setCreateRoomError]=useState('')

  const handleChangeFormInput = (e, inputName) => {
    // Update the corresponding state based on the input name
    switch (inputName) {
      case 'aim':
        setAimC(e.target.value);
        break;
      case 'name':
        setNameC(e.target.value);
        break;
      case 'area':
        setAreaC(e.target.value);
        break;
      case 'description':
        setDisC(e.target.value);
        break;
      default:
        break;
    }
  };




const creatingNewRoom=async()=>{
  try {
    const formData={name:nameC,aim:aimC,area:areaC,description:disC,members:["sdjflkjasf"]}
    const res=await axios.post('http://localhost:5000/api/v1/messages/createRoom',formData);
    
    setCreateRoomError('');
    setAimC('');
    setAreaC('');
    setDisC(''); setNameC('')
    
  } catch (error) {
    setCreateRoomError(error.response.data.msg)
    
  }
}

  return (
    <>
    <div className="chatMain">
      <header className='header1'><Navbar></Navbar></header>
      <div className="chatContainer">
        <div className='chatRoomSection'>
          <div className="chatSearchSection">
            <input onChange={onchangeRoom} value={searchRoom}  className='chatRoomSearchBtn' type="text" placeholder={placeholder} />
            <button className='createNewRoomBtn' onClick={openCreateRoomForm}>+</button>
          </div>
          <div className="displayChatRooms">
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
        {/* create room form=============== */}
        <div className={roomFormClass}>
          <button className='backBtn' onClick={()=>{setRoomFormClass('createRoom'),setCreateRoomError('');}}><CloseIcon></CloseIcon></button>
          <div className="formContainer">
            <input onChange={(e)=>handleChangeFormInput(e,'aim')} value={aimC} type="text" placeholder='aim'/>
            <input onChange={(e)=>handleChangeFormInput(e,'name')} value={nameC} type="text" placeholder='name' />
            <input onChange={(e)=>handleChangeFormInput(e,'area')} value={areaC} type="text"placeholder='area' />
            <input onChange={(e)=>handleChangeFormInput(e,'description')} value={disC} className='inputDisc' type="text" placeholder='disription' />
            <button onClick={creatingNewRoom}>Create Room</button>
            <p className="errorHandleArea">{creatRoomError}</p>
          </div>

        </div>
      </div>
      <footer className='footer'><Footer></Footer></footer>
      </div>
    </>
  );
}

export default Chat;
