const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    comments: {
      type: String,
      required: true,
    },
    kid: {
      ref: 'Kid',
      type: Schema.Types.ObjectId,
    },
    status: {
      ref: 'Status',
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;
