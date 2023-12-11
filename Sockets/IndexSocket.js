const userLogin = require("../model/UserMode");
const roomList = require("../model/RoomList");
const messageList = require("../model/messageSchema");
const {v4: uuidv4} = require("uuid");
const {response} = require("express");

let RoomId;
const Roomsocket = (socket) => {
  // signup  user
  socket.on("add_user", async (data, callback) => {
    try {
      const userlogin = new userLogin({
        userName: data.username,
        roomId: data.roomId,
      });
      userLogin
        .find({roomId: data.roomId})
        .then((res) => {
          if (res.length === 0) {
            userlogin
              .save()
              .then((res) => {
                callback({
                  status: "User Create",
                });
              })
              .catch((err) => {
                callback({
                  status: "add time Internal server error ",
                });
              });
          } else {
            // console.log("else");
            callback({
              status: "another number",
            });
          }
        })
        .catch((error) => {
          // console.log(error);
          callback({
            status: "Internal server error",
          });
        });
    } catch (e) {
      console.log(e);
      callback({
        status: "server side error",
      });
    }
  });

  // login user
  socket.on("login_user", async (data, callback) => {
    try {
      const userlogin = new userLogin({
        userName: data.username,
        roomId: data.roomId,
      });
      userLogin
        .find({roomId: data.roomId})
        .then((res) => {
          if (res.length === 0) {
            callback({
              status: "error",
              response: "user number mismatched",
            });
          } else {
            if (res[0].userName === data.username) {
              callback({
                status: "ok",
                response: "User Login",
                data: res[0],
              });
            } else {
              callback({
                status: "error",
                response: "name mismatched",
              });
            }
          }
        })
        .catch((error) => {
          callback({
            status: "Internal server error",
          });
        });
    } catch (e) {
      console.log(e);
      callback({
        status: "server side error",
      });
    }
  });

  // room add
  socket.on("add_room", async (data, callback) => {
    try {
      var roomlist;
      userLogin.find({roomId: data.roomnum}).then((res) => {
        // find data from user table for check user is exist or not in usertable (user = roomnumber of enterd in popup in front)
        if (res.length > 0) {
          if (res[0].roomId === data.username.Roomid) {
            callback({
              status: "error",
              response: "Room Number Not Exist",
            });
          } else {
            roomList
              .find(
                {
                  $and: [{UserRoomid: data.username.Roomid}, {MyroomId: data.roomnum}],
                },
                {__v: 0}
              )
              .then((res) => {
                if (res.length === 0) {
                  let roomiD = uuidv4();
                  roomlist = new roomList({
                    MyroomId: data.username.Roomid,
                    UserRoomid: data.roomnum,
                    UserName: data.roomname,
                    Myname: data.username.name,
                    RoomId: roomiD,
                  });
                  roomlist.save().then((res) => {
                    callback({
                      status: "ok",
                      response: "Room Create",
                      data: res,
                    });
                  });
                } else {
                  roomList
                    .find(
                      {
                        $and: [{UserRoomid: res[0].MyroomId}, {MyroomId: res[0].UserRoomid}],
                      },
                      {__v: 0}
                    )
                    .then((e) => {
                      if (e.length === 0) {
                        roomlist = new roomList({
                          MyroomId: data.username.Roomid,
                          UserRoomid: data.roomnum,
                          UserName: data.roomname,
                          Myname: data.username.name,
                          RoomId: res[0].RoomId,
                        });
                        roomlist.save().then((res) => {
                          callback({
                            status: "ok",
                            response: "Room Create",
                            data: res,
                          });
                        });
                      } else {
                        callback({
                          status: "error",
                          response: "Oops Room Already Created",
                        });
                      }
                    });
                }
              });
          }
        } else {
          callback({
            status: "error",
            response: "user not found",
          });
        }
      });
    } catch (error) {
      // console.log(error);
      callback({
        status: "error",
        response: "Server Error",
      });
    }
  });

  // room list
  socket.on("room_detail", (data, callback) => {
    try {
      roomList
        .find(
          {
            $or: [{MyroomId: data.data.Roomid}, {UserRoomid: data.data.Roomid}],
          },
          {__v: 0}
        )
        .then((res) => {
          if (res.length > 0) {
            callback({
              status: "ok",
              response: res,
            });
          } else {
            callback({
              status: "error",
              response: [],
            });
          }
        });

      // roomList.find({
      //   $or: [{ MyroomId: data.Roomid }, { UserRoomid: data.Roomid }],
      // });
    } catch (error) {
      callback({
        status: "error",
        response: "Server Error",
      });
    }
  });

  // chat effect
  socket.on("roomuser-type", (data, callback) => {
    socket.to(RoomId).emit("roomuser_type_resend", RoomId);
  });

  // user join
  socket.on("user_jointo_room", (data) => {
    RoomId = data.RoomId;
    socket.join(RoomId);
    socket.to(RoomId).emit("user_jointo_room_db", "user Joined");
  });

  // save chat on db
  socket.on("send_msg_db", (data, callback) => {
    let SenderRoomId = data.selectedUser.RoomId;
    let msglist = new messageList({
      roomId: data.selectedUser.RoomId,
      senderId: data.selectedUser.MyroomId,
      receiverId: data.selectedUser.UserRoomid,
      message: data.textmess,
    });
    msglist
      .save()
      .then((res) => {
        callback({
          status: "done",
        });
        socket.to(SenderRoomId).emit("send_msg_fromdb", res);
      })
      .catch((err) => {
        callback({
          status: "error",
        });
      });
    // socket.to(RoomId).emit("user_jointo_room_db", 'user Joined')
  });

  //user remove from left portion if react
  socket.on("delete_user", (data, callback) => {
    // console.log(data)
    roomList
      .findByIdAndDelete(data._id)
      .then((res) => {
        console.log(res);
        callback({
          status: "ok",
          response: "user Removed Successfylly",
        });
      })
      .catch((err) => {
        callback({
          status: "error",
          response: err,
        });
      });
  });

  // remove specifc user chat from db
  socket.on("delete_user_chat", (data, callback) => {
    messageList
      .deleteMany({roomId:data})
      .then((res) => {
        callback({
          status: "ok",
          response: "user Removed Successfylly",
        });
      })
      .catch((err) => {
        callback({
          status: "error",
          response: err,
        });
      });
  });

};

module.exports = Roomsocket;
