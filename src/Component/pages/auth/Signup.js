import React, { useContext, useEffect, useState } from "react";
import SocketContext, { useSocket } from "../../../Context";
import Card from "react-bootstrap/Card";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const socket = useSocket();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  let handlesendroomid = () => {
    socket.emit("add_user", { username, roomId }, (response) => {
      if (response.status === "User Create") {
        history.push("/");
      } else {
        setError(response.status);
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
            <Card.Title>Signup</Card.Title>
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
                <label className="signupcss"><Link to='/'> login </Link></label>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
