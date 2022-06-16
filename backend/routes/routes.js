const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validations');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);
router.use(cardRouter);
router.use(userRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
