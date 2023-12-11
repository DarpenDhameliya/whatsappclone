const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomListSchema = new Schema({
  MyroomId: Number,
  UserRoomid:Number,
  UserName: String,
  Myname: String,
  RoomId: String
});

module.exports = mongoose.model("roomlist", RoomListSchema);
