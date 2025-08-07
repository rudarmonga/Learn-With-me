const ChatRoom = require('../models/models.chatRoom');
const Message = require('../models/models.message');

exports.createRoom = async (req, res) => {
  const { participants, isGroup, name } = req.body;
  const room = await ChatRoom.create({ participants, isGroup, name });
  res.status(201).json(room);
};

exports.sendMessage = async (req, res) => {
  const { chatRoom, sender, content, type } = req.body;

  const message = await Message.create({ chatRoom, sender, content, type });

  await ChatRoom.findByIdAndUpdate(chatRoom, {
    lastMessage: message._id,
    updatedAt: Date.now(),
  });

  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({ chatRoom: req.params.roomId }).populate('sender');
  res.json(messages);
};
