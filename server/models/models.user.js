const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
            'Please enter a valid email address',
        ],
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
            return /^(?=.*[A-Z])(?=.*\d).+$/.test(value);
            },
            message:
            'Password must contain at least one uppercase letter and one number',
        },
    },
    avatarUrl: { 
        type: String 
    },
    role: {
      type: String,
      enum: ['STUDENT', 'MENTOR'],
      default: 'STUDENT',
    },
    bio: { 
        type: String
    },
    expertise: [
        String
    ],
    interests: [
        String
    ],
    postIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post'
    }],
    chatRoomIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ChatRoom'
    }],
    isOnline: {
        type: Boolean, default: false
    },
    lastSeen: {
        type: Date 
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);