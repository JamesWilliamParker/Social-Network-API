const { Schema, model } = require('mongoose');

// Schema for the User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'], // Mongoose email validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to Thought model
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User', // Self-reference for friends
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Enable virtual fields
    },
    id: false, // Disable the `id` field by default
  }
);

// Virtual to get the number of friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema);

module.exports = User;
