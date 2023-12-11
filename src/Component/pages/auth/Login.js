import React, { useContext, useEffect, useState } from "react";
import SocketContext, { useSocket } from "../../../Context";
import Card from "react-bootstrap/Card";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  // const socket = useContext(SocketContext);
  const socket = useSocket();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('whatsapp_user')
  }, [])


  let handlesendroomid = () => {
    console.log(socket)
    socket.emit("login_user", { username, roomId }, (response) => {
      if (response.status == "ok") {
        const userdetail = {
          name: response.data.userName,
          Roomid: response.data.roomId,
        };
        localStorage.setItem("whatsapp_user", JSON.stringify(userdetail));
        history.push("/app/home");
      } else {
        setError(response.response);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    });
  };
  return (
    <>
      <div className="loginPage">
        <div className="container logincontain">
          <Card className="logincard">
            <Card.Body>
            <Card.Title>login</Card.Title>
              {error && <p>{error}</p>}
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control mt-3"
                  id="exampleFormControlInput1"
                  placeholder="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {/* {brodcastchcek && ( */}
                <input
                  type="text"
                  className="form-control mt-3"
                  id="exampleFormControlInput1"
                  placeholder="Your Room Id"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                {/* )} */}
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={handlesendroomid}
                >
                  send
                </button>
                <label className="signupcss"><Link to='/signup'> signup </Link></label>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Login