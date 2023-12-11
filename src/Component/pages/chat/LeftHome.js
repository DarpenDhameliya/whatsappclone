/* eslint-disable */
import React, {useEffect, useContext, useState} from "react";
import {useSocket} from "../../../Context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {useSelector, useDispatch} from "react-redux";
import {ClickUserValue} from "./slice/LeftHomeSlice";
import {FaTrashAlt, FaPen} from "react-icons/fa";
const LeftHome = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [roomname, setRoomname] = useState("");
  const [roomnum, setRoomnum] = useState("");
  const [userChat, setUserChat] = useState([]);
  const [listView, setListView] = useState(false);
  const [roomError, setRoomError] = useState("");
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("whatsapp_user")));
  }, []);

  const getRoomDetails = () => {
    if (!socket) return;
    let data = JSON.parse(localStorage.getItem("whatsapp_user"));
    socket.emit("room_detail", {data}, (response) => {
      setListView(true);
      setUserChat(response.response);
    });
  };

  useEffect(() => {
    getRoomDetails();
    if (!socket) return;
  }, [socket]);
  const handleClose = () => {
    setShow(false);
    setRoomname("");
    setRoomnum("");
  };

  const handleShow = () => setShow(true);
  const savedatadb = () => {
    if (socket) {
      socket.emit("add_room", {roomname, roomnum, username}, (response) => {
        if (response.status == "ok") {
          setShow(false);
          setRoomname("");
          setRoomnum("");
          setRoomError("");
          getRoomDetails();
        } else {
          setRoomError(response.response);
          setTimeout(() => {
            setRoomError("");
          }, 3000);
        }
      });
    }
  };

  const handlelistDetails = (data) => {
    dispatch(ClickUserValue(data));
    socket.emit("user_jointo_room", data);
  };

  const handleedit = (e) => {
    console.log("edit", e);
  };
  const handledelete = (e) => {
    socket.emit("delete_user", e, (res) => {
      if (res.status === "ok") {
        getRoomDetails();
      } else {
        console.log("delete error ", res);
      }
    });
  };
  return (
    <>
      <header className="softstormweb-header_1 ">
        <div className="row text-center">
          <div className="col-lg-6 col-md-6 col-sm-12 col-6 order-1 order-sm-1 d-flex justify-content-start " style={{minHeight: "50px", alignItems: "center"}}>
            <h5>{username.name}</h5>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 order-3 order-sm-2 d-flex justify-content-end" style={{minHeight: "50px", alignItems: "center"}}>
            <button className="btn main-btn" onClick={handleShow}>
              add Number
            </button>
          </div>
        </div>
      </header>
      <div className="handle_roomlist">
        <ul>
          {listView &&
            userChat.map((e) => {
              if (e.MyroomId === username.Roomid) {
                return (
                  <div className="d-flex justify-content-between handlehover" style={{padding: "5px 10px", cursor: "pointer"}}>
                    <li style={{width: "80%"}} onClick={() => handlelistDetails(e)}>
                      {e.UserName}
                    </li>
                    <div>
                      <FaPen onClick={() => handleedit(e)} />
                      <FaTrashAlt style={{marginLeft: "10px"}} onClick={() => handledelete(e)} />
                    </div>
                  </div>
                );
              }
            })}
        </ul>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>new room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> name</Form.Label>
              <Form.Control type="text" placeholder="Add User Name" value={roomname} onChange={(e) => setRoomname(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Room Number</Form.Label>
              <Form.Control type="text" placeholder="Add User Room Number" value={roomnum} onChange={(e) => setRoomnum(e.target.value)} />
            </Form.Group>
          </Form>
          {roomError && <label>{roomError}</label>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={savedatadb}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LeftHome;
