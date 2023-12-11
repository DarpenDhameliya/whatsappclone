// // // // const express = require("express");
// // // // const router = express.Router();

// // const MessageSocket = (data) => {
// //   console.log("----------------------------");
// // };

// // // // const loginUser = (data) => {
// // // //   console.log("=================>", socket.id);
// // // //   id = socket.id;
// // // //   console.log(data);
// // // //   socket.broadcast.emit("addperson_response", { data, id });
// // // // };

// // // // module.exports = { MessageSocket, loginUser };
// // module.exports = MessageSocket;

// // // // function MessageSocket (data)  {
// // // //   console.log("----------------------------");
// // // // };

// // // // function loginUser (data) {
// // // //   console.log("=================>", socket.id);
// // // //   id = socket.id;
// // // //   console.log(data);
// // // //   socket.broadcast.emit("addperson_response", { data, id });
// // // // };

// // // // module.exports = { MessageSocket , loginUser };

// // // function loginUser(data, socket) {
// // //   console.log("=================>", socket.id);
// // //   const id = socket.id;
// // //   console.log(data);
// // //   socket.broadcast.emit("addperson_response", { data, id });
// // // }

// // // function messageSocket(data) {
// // //   console.log("----------------------------");
// // // }

// // // module.exports = { loginUser, messageSocket };

// // module.exports = { MessageSocket: (data) => {
// //   console.log("----------------------------");
// // }, 
// // loginUser: (data, socket) => {
// //   console.log("=================>", socket.id);
// //   const id = socket.id;
// //   console.log(data);
// //   socket.broadcast.emit("addperson_response", { data, id });
// // }};

// // const MessageSocket = (data) => {
// //   console.log("----------------------------");
// // };

// const LoginSocket = (data , socket) => {
//   id = socket
//   console.log('=================>',socket)
//   console.log(data)
//   // socket.broadcast.emit('addperson_response',{data , id})
// };
// module.exports = LoginSocket;

const loginSocket = (data , socket) => {
     console.log('=================>',socket)
    id = socket
    console.log(data)
    socket.broadcast.emit('addperson_response',{data , id})
}

module.exports = loginSocket;