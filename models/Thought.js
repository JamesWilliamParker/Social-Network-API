const { Schema, model, Types } = require('mongoose');
const moment = require('moment'); // For date formatting

// Reaction schema (Subdocument schema for the Thought model)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'), // Getter to format the date
    },
  },
  {
    toJSON: {
      getters: true, // Enable getter methods
    },
    id: false, // Disable the `id` field
  }
);

// Schema for Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'), // Getter for date formatting
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Embed the reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false, // Disable the `id` field
  }
);

// Virtual to get the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
