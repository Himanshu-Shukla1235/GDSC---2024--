import React, { useState, useEffect } from "react";
import "./chat.css";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../components/Nav";
import Footer from "../components/footer";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
import Avatar from "@mui/material/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faBars } from "@fortawesome/free-solid-svg-icons";
import { blue } from "@mui/material/colors";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
const Chat = () => {
  const [placeholder, setPlaceholder] = useState("");
  const word = [
    "s",
    "e",
    "a",
    "r",
    "c",
    "h",
    " ",
    "f",
    "o",
    "r",
    " ",
    "c",
    "h",
    "a",
    "t",
    "r",
    "o",
    "o",
    "m",
    "s",
  ];
  const [i, setI] = useState(0);
  const [shouldContinue, setShouldContinue] = useState(true);
  const [index, setIndex] = useState(0);
  const [searchRoom, setSearchRoom] = useState("");
  const [roomFormClass, setRoomFormClass] = useState("createRoom");
  const [receivedData, setReceivedData] = useState("");

  //for send message
  const onChangeSendMessage = (e) => {
    setSendMessage(e.target.value);
  };

  // cretaeing form
  const openCreateRoomForm = () => {
    setRoomFormClass("clickedCreateRoom");
    setchatRoomSection("chatRoomSectionClicked");
    setchatMessagesSection("chatMessagesSectionClicked");
    // const a=document.querySelector('.chatMessagesSection')
    // a.style.filter="blur(5px)"
  };

  //crreaing new room
  const [aimC, setAimC] = useState("");
  const [nameC, setNameC] = useState("");
  const [areaC, setAreaC] = useState("");
  const [disC, setDisC] = useState("");
  const [creatRoomError, setCreateRoomError] = useState("");

  const handleChangeFormInput = (e, inputName) => {
    // Update the corresponding state based on the input name
    switch (inputName) {
      case "aim":
        setAimC(e.target.value);
        break;
      case "name":
        setNameC(e.target.value);
        break;
      case "area":
        setAreaC(e.target.value);
        break;
      case "description":
        setDisC(e.target.value);
        break;
      default:
        break;
    }
  };

  const creatingNewRoom = async () => {
    setLoaderClass("createLoaderON");
    await handleAvatarSubmit();
    if (!roomAvatarLink) {
      setCreateRoomError("problem in uploading image!!");
      setLoaderClass("createLoaderOFF");
      return;
    }
    console.log("setting the url", roomAvatarLink);
    try {
      const formData = {
        name: nameC,
        aim: aimC,
        area: areaC,
        description: disC,
        members: ["sdjflkjasf"],
        avatar: roomAvatarLink,
      };
      const res = await axios.post(
        "http://localhost:5000/api/v1/messages/createRoom",
        formData
      );

      setCreateRoomError("");
      setAimC("");
      setAreaC("");
      setDisC("");
      setNameC("");
      setLoaderClass("createLoaderOFF");

      window.location.reload();
    } catch (error) {
      setCreateRoomError(error.response.data.msg);
      setLoaderClass("createLoaderOFF");
    }
  };

  // ==============================working joined chat rooms
  const [joinedChatRooms, setJoinedChatRooms] = useState([]);

  const onchangeRoom = async (e) => {
    const newValue = e.target.value;
    setSearchRoom(newValue);
  };
  //for searching the room and for alredy joined rooms
  useEffect(() => {
    console.log(searchRoom);

    if (searchRoom == "") {
      let fetchData = async () => {
        const res = await axios.get(
          "http://localhost:5000/api/v1/chat/roomsJoined"
        );
        console.log(res.data.result);
        setUsername(res.data.user.username);
        const dat = res.data.result;
        const newData = dat.map((item) => ({
          ...item,
          className: "displayNo",
        }));

        console.log(newData);

        setJoinedChatRooms(newData);
      };
      fetchData();
    } else {
      let fetchData = async () => {
        const res = await axios.get(
          "http://localhost:5000/api/v1/chat/search",
          {
            params: {
              name: searchRoom,
              location: "searchRoom",
            },
          }
        );
        const dat = res.data.rooms;
        // console.log(res.data.rooms)
        // Use map to create a new array with the added className property
        const newData = dat.map((item) => ({
          ...item,
          className: "displayYes",
        }));

        console.log(newData);

        setJoinedChatRooms(newData);
        console.log(res);
      };
      fetchData();
    }
  }, [searchRoom]);

  // useEffect(()=>{
  //   if(searchRoom=='')
  //   {
  //     console.log('hello')
  //   }

  // },[joinedChatRooms])

  // const alredyJoinedRooms=async()=>{

  //   try {
  //     const res = await axios.get('http://localhost:5000/api/v1/chat/roomsJoined');
  //     const dat=res.data.rooms;
  //     // dat.className='displayYes'
  //     // console.log("here",dat);
  //     setJoinedChatRooms(res.data.rooms);
  //     // console.log(res.data.rooms)
  //     // setJoinedRoomsID()

  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  //working with add message to the database
  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState("");
  const [username, setUsername] = useState("");

  const [currentChatRoom, setCurrentChatRoom] = useState("");
  const [currentChatRoomName, setCurrentChatRoomName] = useState(
    "select chatRoom to chat."
  );
  const [currentChatRoomURL, setCurrentChatRoomURL] = useState(null);

  const addMessage = async (e) => {
    // e.preventDefault();

    if (currentChatRoom == "") return;

    console.log(socket);
    const time = {
      day: new Date().getDate(),
      month: new Date().getMonth(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    };
    console.log(time);
    socket.emit("send-message", {
      message: sendMessage,
      sender: username,
      chatRoomID: currentChatRoom,
      time: time,
    });

    try {
      const see = await axios.post(
        "http://localhost:5000/api/v1/messages/add",
        {
          // Change this line to use req.user.userId directly
          message: sendMessage,
          chatRoomID: currentChatRoom,
          time: time,
        }
      );

      setUsername(see.data.user);

      const newM = {
        message: {
          text: sendMessage,
        },
        sender: {
          name: see.data.user,
        },
      };

      // setMessages((prevMessage) => [
      //   ...prevMessage,
      //   newM
      // ]);
      setSendMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  //display chat of particular room

  const chatRoomClicked = (id, name, avatar) => {
    setCurrentChatRoom(id);
    setCurrentChatRoomName(name);
    setCurrentChatRoomURL(avatar);
  };

  useEffect(() => {
    console.log(currentChatRoom, currentChatRoomName);
    const messagesURL = "http://localhost:5000/api/v1/messages/allMessages";
    const fetching = async () => {
      try {
        const data = await axios.get(messagesURL, {
          params: {
            chatRoomID: currentChatRoom,
          },
        });
        let Datamessages = data.data;
        console.log(Datamessages);

        //make sure it is empty
        setMessages([]);

        setMessages((prevMessage) => [
          ...prevMessage,
          ...Datamessages.map((item) => item),
        ]);

        console.log(messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetching();
  }, [currentChatRoom]);

  useEffect(() => {
    // Attach the event handler to the socket
    socket.on("broadcast-message", (data) => {
      // Create a new message object with the received data
      const newMessage = {
        message: {
          text: data.message,
        },
        sender: {
          name: data.sender,
          id: "dfasf",
        },
        time: {
          day: data.time.day,
          month: data.time.month,
          hours: data.time.hours,
          minutes: data.time.minutes,
        },
      };

      console.log(newMessage); // Optional: log the new message for debugging
      console.log("working", currentChatRoom, data.chatRoomID);

      // Update the state using the previous state to avoid potential issues
      if (currentChatRoom == data.chatRoomID) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      // socket.disconnect();
      socket.off("broadcast-message");
    };
  }, [currentChatRoom]); // The empty dependency array ensures that this effect runs once when the component mounts

  //working with joining chat rooms

  const joinRoom = async (roomId) => {
    console.log("clickd");
    const url = "http://localhost:5000/api/v1/chat/roomsJoined";
    const res = await axios.post(url, { params: { chatRoomID: roomId } });
    console.log(res);
  };
  const handleKeyDown = (e) => {
    // Check if the Enter key is pressed and the input is focused
    if (e.key === "Enter" && e.target === document.activeElement) {
      // Trigger the addMessage function when Enter is pressed and the input is focused

      addMessage();
    }
  };
  //working  avatar system......................
  const [loaderClass, setLoaderClass] = useState("createLoaderOFF");
  const [roomAvatar, setRoomAvatar] = useState();
  const [roomAvatarLink, setRoomAvatarLink] = useState(null);

  const handleAvatarChange = (e) => {
    setRoomAvatar(e.target.files[0]);
    console.log("active");
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", roomAvatar);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = "dydbv12n6";
      let resourceType = "image";
      let api = `http://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const transformations = [{ width: 300, height: 300, crop: "fill" }];
      axios.defaults.headers.common["Authorization"] = undefined;
      const res = await axios.post(api, data);

      //re
      const jwtToken = localStorage.getItem("token");
      if (jwtToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
      }

      const { secure_url } = res.data;
      console.log(secure_url);
      setRoomAvatarLink(secure_url);

      return secure_url;
    } catch (error) {
      console.log(error.response.data.error.message);
      setUploadError(error.response.data.error.message);
      console.log(error);
    }
  };
  const handleAvatarSubmit = async () => {
    try {
      const imgUrl = await uploadFile(); // Wait for uploadFile to complete
      setRoomAvatarLink(imgUrl);
      console.log("avatar generated url:", imgUrl);
    } catch (error) {
      console.log("Error handling avatar submit:", error);
      // Handle the error as needed
    }
  };
  //=========================================
  const [chatRoomSection, setchatRoomSection] = useState("chatRoomSection");
  const [chatMessagesSection, setchatMessagesSection] = useState(
    "chatMessagesSection"
  );

  return (
    <>
      <div className="chatMain">
        <header className="header1">
          <Navbar></Navbar>
        </header>
        <div className="chatContainer">
          <div className={chatRoomSection}>
            <div className="chatSearchSection">
              <input
                onChange={onchangeRoom}
                value={searchRoom}
                className="chatRoomSearchBtn"
                type="text"
                placeholder="search"
              />
              <button className="createNewRoomBtn" onClick={openCreateRoomForm}>
                <CreateIcon className="createIcon" />
              </button>
            </div>
            <div className="displayChatRooms">
              {joinedChatRooms.map((room) => (
                <div
                  onClick={() =>
                    chatRoomClicked(room._id, room.name, room.avatar)
                  }
                  key={room._id}
                  className="chatRoom">
                  <span className="photoNameSet">
                    <Avatar alt={room.name} src={room.avatar} />
                    <a>{room.name}</a>
                  </span>
                  <button className="addedandPlus">
                    <button
                      key={room._id}
                      onClick={() => {
                        joinRoom(room._id), (room.isadded = "joined!");
                      }}
                      className={room.className}>
                      <AddIcon
                        style={{
                          display:
                            room.isadded === "joined!" ? "none" : "block",
                        }}
                        className="plus"
                      />
                    </button>
                    <div className="joinedText">{room.isadded}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={chatMessagesSection}>
            <span className="currentchatNameandPhoto">
              <Avatar
                className="avatar2"
                alt="Avatar"
                src={currentChatRoomURL}
              />
              <div className="chatRoomName">{currentChatRoomName}</div>
            </span>
            <div className="messagesDisplayArea">
              {messages.map((message, index) => (
                <div className="messageUser">
                  <a href="" className="senderNmae">
                    {message.sender.name}
                  </a>
                  <p className="messsage">{message.message.text}</p>
                  <p className="timeContainer">
                    Date:{message.time.day},{message.time.month} / Time:
                    {message.time.hours}:{message.time.minutes}
                  </p>
                </div>
              ))}
            </div>

            <div className="messagesSendOption">
              <input
                onKeyDown={handleKeyDown}
                placeholder="message"
                className="sendMessageInput"
                type="text"
                value={sendMessage}
                onChange={onChangeSendMessage}
              />
              <button className="sendMessageBtn" onClick={addMessage}>
                Send
              </button>
            </div>
          </div>
          {/* create room form=============== */}
          <div className={roomFormClass}>
            <button
              className="backBtn"
              onClick={() => {
                setRoomFormClass("createRoom"),
                  setCreateRoomError(""),
                  setchatRoomSection("chatRoomSection"),
                  setchatMessagesSection("chatMessagesSection");
                // setRoomAvatar();
                // setRoomAvatarLink(null);
              }}>
              <CloseIcon></CloseIcon>
            </button>

            <div className="formContainer">
              <label htmlFor="avatarInput">
                <Avatar
                  alt="Avatar"
                  className="aavatar"
                  src={
                    // roomAvatarLink ||
                    (roomAvatar instanceof File &&
                      URL.createObjectURL(roomAvatar)) ||
                    ""
                  }
                  style={{ cursor: "pointer", width: "100px", height: "100px" }}
                />
              </label>
              <input
                type="file"
                id="avatarInput"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />

              <input
                onChange={(e) => handleChangeFormInput(e, "aim")}
                value={aimC}
                type="text"
                placeholder="aim"
              />
              <input
                onChange={(e) => handleChangeFormInput(e, "name")}
                value={nameC}
                type="text"
                placeholder="name"
              />
              <input
                onChange={(e) => handleChangeFormInput(e, "area")}
                value={areaC}
                type="text"
                placeholder="area"
              />
              <input
                onChange={(e) => handleChangeFormInput(e, "description")}
                value={disC}
                className="inputDisc"
                type="text"
                placeholder="disription"
              />
              <button onClick={creatingNewRoom}>
                <h2 style={{ fontWeight: 8, cursor: "pointer" }}>create</h2>
                {/* <i
                  id="loader"
                  className="fa-solid fa-spinner fa-spin-pulse"></i> */}
              </button>
              <FontAwesomeIcon
                className={loaderClass}
                style={{ marginTop: "10px", color: blue }}
                icon={faSpinner}
                rotation={270}
                spin
              />
              <p className="errorHandleArea">{creatRoomError}</p>
            </div>
          </div>
        </div>
        <footer className="footer">
          <Footer></Footer>
        </footer>
      </div>
    </>
  );
};

export default Chat;
