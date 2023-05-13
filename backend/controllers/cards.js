const {
  BadRequestError, NotFoundError, ForbiddenError, InternalServerError,
} = require('../utils/errors');

const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { user } = req;

  Card.create({ name, link, owner: user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные.'));
      } else {
        next(new InternalServerError('Что-то пошло не так.'));
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner likes')
    .then((cards) => res.send(cards))
    .catch(() => {
      next(new InternalServerError('Что-то пошло не так.'));
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { user } = req;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена.'));
      }

      if (card.owner._id.toString() !== user._id.toString()) {
        return next(new ForbiddenError('Вы не являетесь владельцем этой карточки.'));
      }

      return card.deleteOne().then(() => res.send({ message: `Card: ${cardId} is no more! (Удалена успешно)` })).catch(() => {
        next(new InternalServerError('Что-то пошло не так.'));
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные.'));
      } else {
        next(new InternalServerError('Что-то пошло не так.'));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { user } = req;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: user._id } }, { new: true })
    .populate('owner likes')
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена.'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные.'));
      } else {
        next(new InternalServerError('Что-то пошло не так.'));
      }
    });
};

module.exports.disLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { user } = req;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: user._id } }, { new: true })
    .populate('owner likes')
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с таким id не найдена.'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные.'));
      } else {
        next(new InternalServerError('Что-то пошло не так.'));
      }
    });
};
