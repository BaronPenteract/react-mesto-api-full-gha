const bcrypt = require('bcryptjs');

const {
  BadRequestError, NotFoundError, UnauthorizedError, InternalServerError, ConflictError,
} = require('../utils/errors');

const { generateToken } = require('../utils/token');

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(() => {
      next(new InternalServerError('Что-то пошло не так.'));
    });
};

module.exports.getUserById = (req, res, next) => {
  let userId;

  if (req.path === '/me') {
    userId = req.user._id;
  } else {
    userId = req.params.userId;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некоррекный id.'));
      }

      return next(new InternalServerError('Что-то пошло не так.'));
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.json(user)))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные.'));
      }

      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с таким e-mail уже существует.'));
      }

      return next(new InternalServerError('Что-то пошло не так.'));
    });
};

module.exports.patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному id не найден.'));
      }
      return res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный id.'));
      } else {
        next(new InternalServerError('Что-то пошло не так.'));
      }
    });
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  if (!avatar) {
    next(new BadRequestError('Все поля длжны быть заполнены.'));
  } else {
    User.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: false,
      },
    )
      .then((user) => {
        if (!user) {
          return next(new NotFoundError('Пользователь по указанному id не найден.'));
        }
        return res.json(user);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new BadRequestError('Некорректный id.'));
        } else {
          next(new InternalServerError('Что-то пошло не так.'));
        }
      });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильные почта или пароль.'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new UnauthorizedError('Неправильные почта или пароль.'));
          }

          const token = generateToken(
            { _id: user._id, email: user.email },
            { expiresIn: '7d' },
          );

          res.json({ token });
        });
    })
    .catch(() => {
      next(new InternalServerError('Что-то пошло не так.'));
    });
};
