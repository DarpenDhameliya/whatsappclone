// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// var bodyParser = require("body-parser");
// const mongoconnect = require('./db')

// var cors = require("cors");
// const Roomsocket = require("./Sockets/LoginSocket");
// mongoconnect();
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection" , Roomsocket)
// // io.on("connection", (socket) => {
// //   console.log('user connnnnnnnnnnnnnnnnnnnnnn',socket.id)
// //   socket.on('add_user' , data => {
// //     id = socket.id
// //     console.log(data)
// //     socket.broadcast.emit('addperson_response',{data , id})
// //   })


// //   socket.on('sendmess' , data => {

// //     console.log('sendmess event handler executed');
// //     console.log('==========================>',socket.id)
// //     socket.broadcast.emit('receivemess','bol bhai')
// //   })


// // });


// app.get("/", (req, res) => {
//   res.send("Server is up and running");
// });

// // app.use("/app", require("./routs/Roomapi"));

// server.listen(8002, () => {
//   console.log(`Server is listening on port 8002`);
// });


const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
var bodyParser = require("body-parser");
const mongoconnect = require('./db')

var cors = require("cors");
const Roomsocket = require("./Sockets/IndexSocket");
mongoconnect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// const secondPage = require('./Sockets/IndexSocket')(io);
// pass Roomsocket as a function to io.on() method
io.on("connection" , Roomsocket)

app.use("/app", require("./routs/RoomChat"));

server.listen(8002, () => {
  console.log(`Server is listening on port 8002`);
});