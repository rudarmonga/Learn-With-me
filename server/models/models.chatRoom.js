const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatRoomSchema = new Schema(
  {
    isGroup: { type: Boolean, default: false },
    participants: {
      type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
      validate: [arr => arr.length >= 2, 'At least two participants required'],
    },
    name: {
      type: String,
      required: function () {
        return this.isGroup;
      },
    },
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
