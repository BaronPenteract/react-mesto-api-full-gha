const router = require('express').Router();
const {
  celebrate, Joi, Segments,
} = require('celebrate');

const { URL_REGEXP } = require('../utils/constants');

const {
  getCards, deleteCard, createCard, likeCard, disLikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

// post
router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(URL_REGEXP).required(),
  }),
}), createCard);

// delete card
router.delete('/:cardId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCard);

// like
router.put('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

// dislike
router.delete('/:cardId/likes', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), disLikeCard);

module.exports = router;
