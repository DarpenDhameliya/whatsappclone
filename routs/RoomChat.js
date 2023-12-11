const express = require("express");
const messagechat = require("../model/messageSchema");
const router = express.Router();

router.post("/chat", async (req, res) => {
  messagechat
    .find({ roomId: req.body.roomid }, { _id: 0, __v: 0 })
    .sort({ timestamp: "asc" })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

module.exports = router;