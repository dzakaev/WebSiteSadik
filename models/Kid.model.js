const { Schema, model } = require('mongoose');

const kidSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    patronymic: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

const Kid = model('Kid', kidSchema);
module.exports = Kid;
