const { Schema, model } = require('mongoose');

const statusSchema = new Schema(
  {
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Status = model('Status', statusSchema);

module.exports = Status;
