const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const {
  userIdSchema,
  userProfileSchema,
  userAvatarSchema,
} = require('../validation/JoiValidation');

router.get('/', getUsers);
router.get('/me', getUser);

router.get('/:userId', userIdSchema, getUserById);

router.patch('/me', userProfileSchema, updateUserProfile);

router.patch('/me/avatar', userAvatarSchema, updateUserAvatar);

module.exports = router;
