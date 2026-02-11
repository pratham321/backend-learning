const AppError = require("../utils/appError");
const {
  registerUserService,
  loginUserService,
} = require("../services/user.service");

/* ================= REGISTER ================= */
const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("Name, email and password are required", 400));
  }

  try {
    await registerUserService(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (err) {
    next(err);
  }
};

/* ================= LOGIN ================= */
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  try {
    const token = await loginUserService(email, password);

    res.json({
      status: "success",
      message: "Login successful",
      token,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = (req, res) => {

  res.json({
    message: "Profile data accessed",
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
