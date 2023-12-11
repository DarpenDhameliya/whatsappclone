const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModelSchema = new Schema({
  roomId: Number,
  userName: String
});

module.exports = mongoose.model("usermodel", UserModelSchema);
