/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from "react";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {useSocket} from "../../../Context";
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";
import {ClickUserValue} from "./slice/LeftHomeSlice";
import {FaTrashAlt} from "react-icons/fa";
import notification from "../../../notification.wav";

const RightHome = () => {
  const [textmess, setTextmess] = useState("");
  const [userActive, setUserActive] = useState(false);
  const [username, setUsername] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const [callapi, setCallapi] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [roomId, setRoomId] = useState("");
  const [typeing, setTypeing] = useState(false);
  const socket = useSocket();
  const selected_val = useSelector(ClickUserValue);
  const containerRef = useRef();
  var audioElement = new Audio(notification);
  useEffect(() => {
    if (selected_val.payload.lefthome.value.length !== 0) {
      setSelectedUser([]);
      setUserActive(true);
      setCallapi(true);
      setSelectedUser(selected_val.payload.lefthome.value);
      setRoomId(selected_val.payload.lefthome.value.RoomId);
    }
  }, [selected_val]);
  useEffect(() => {
    let userdata = JSON.parse(localStorage.getItem("whatsapp_user"));
    setUsername(userdata);
  }, []);

  const fetchapi = () => {
    fetch("http://192.168.0.238:8002/app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomid: roomId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserChat(data);
        setCallapi(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (userActive && callapi) {
      fetchapi();
    }
  }, [callapi]);


  useEffect(() => {
    if (containerRef.current !== undefined) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [userChat]);

  useEffect(() => {
    if (!socket) return;
    socket.on("user_jointo_room_db", (data) => {
      console.log(data);
    });

    socket.on("send_msg_fromdb", (data) => {
      setUserChat((pre) => [...pre, data]);
      if (username.Roomid !== data.eceiverId) {
        audioElement.play();
      }
    });

    socket.on("roomuser_type_resend", (receive) => {
      setTypeing(true);
      setTimeout(() => {
        setTypeing(false);
      }, 3000);
    });
  }, [socket]);

  const handlemess = (e) => {
    if (socket) {
      socket.emit("roomuser-type", roomId);
      setTextmess(e.target.value);
    }
  };

  const handlesendmess = () => {
    socket.emit("send_msg_db", {textmess, selectedUser}, (res) => {
      if (res.status === "done") {
        setTextmess("");
        let sendmess = {
          roomId: selectedUser.RoomId,
          senderId: selectedUser.MyroomId,
          receiverId: selectedUser.UserRoomid,
          message: textmess,
        };
        setUserChat((pre) => [...pre, sendmess]);
      }
    });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handlesendmess();
    }
  };
  const handledelete = (e) => {
    socket.emit("delete_user_chat", roomId, (res) => {
      if (res.status === "ok") {
        setUserChat([]);
      } else {
        console.log("delete error ", res);
      }
    });
  };
  return (
    <>
      {userActive ? (
        <div className="handle_chat">
          <div style={{height: "49px", display: "flex", alignItems: "center", padding: "0 20px", justifyContent: "space-between", borderBottom: "1px solid"}}>
            <h4>{selectedUser.UserName}</h4>

            <FaTrashAlt style={{marginLeft: "10px"}} onClick={handledelete} />
          </div>
          <div className="msgcontainer" ref={containerRef}>
            {userChat.map((res) => {
              return <Typography className={`${res.senderId === username.Roomid ? "handlechatview_right" : " handlechatview_left"} `}>{res.message}</Typography>;
            })}
          </div>
          {/* <button onClick={handleclick} /> */}
          {typeing && <p style={{position: "absolute", bottom: "30px"}}>typeing...</p>}
          <InputGroup className="mb-1 handleInput_chat p-2">
            <FormControl placeholder="Enter text" aria-label="Enter text" value={textmess} onChange={handlemess} onKeyPress={handleEnter} />
            <Button variant="outline-secondary" id="button-addon2" onClick={handlesendmess}>
              Submit
            </Button>
          </InputGroup>
          <audio id="notificationSound" preload="auto">
        <source src={notification} type="audio/mpeg" />
      </audio>
        </div>
      ) : (
        <div className="handle_chat handleemptychat">
          <h5>select user to chat</h5>
        </div>
      )}
    </>
  );
};

export default RightHome;
