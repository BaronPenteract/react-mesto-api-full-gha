const mongoose = require('mongoose');

const { URL_REGEXP } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательное'],
    minlength: [2, 'Слишком короткое значение'],
    maxlength: [30, 'Слишком длинное значение'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательное'],
    validate: {
      validator: (url) => URL_REGEXP.test(url),
      message: ({ VALUE }) => `${VALUE} не является действительным URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
