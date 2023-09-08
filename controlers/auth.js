const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const { User } = require('../models/user');

const { HttpError, ctrlWrapper, sendEmail } = require('../helper');

const { SEKRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409);
  }
  const hashPassword = await bcryp.hash(password, 10);
  const verficationCode = nanoid();
  const verficationEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verficationCode}">Click varify email</a>`,
  };

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken: verficationCode,
  });

  await sendEmail(verficationEmail);

  res.status(201).json({
    nickName: newUser.nickName,
    email: newUser.email,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'Email not found');
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });
  res.json({
    messaga: 'Verification successful',
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'Email not found');
  }
  if (user.verify) {
    throw HttpError(400, '"Verification has already been passed"');
  }
  const verficationEmail = {
    to: user.email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click varify email</a>`,
  };
  await sendEmail(verficationEmail);
  res.json({
    message: 'Verification email sent',
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401);
  }
  if (!user.verify) {
    throw HttpError(404, 'User not found');
  }
  const passwordCompare = await bcryp.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401);
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  await User.findByIdAndUpdate(_id, { token: '' });
  res.status(204).json({
    message: 'No Content',
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
