const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

/* ================= REGISTER ================= */
const registerUserService = async ({ name, email, password, role }) => {
  const allowedRoles = ["user", "manager","admin"];
  const userRole = allowedRoles.includes(role) ? role : "user";

  // Check email
  const [existingUser] = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, userRole]
  );
};

/* ================= LOGIN ================= */
const loginUserService = async (email, password) => {
  const [users] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (users.length === 0) {
    throw new AppError("User not found", 404);
  }

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  return jwt.sign(
    { id: user.id, role: user.role, name:user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = {
  registerUserService,
  loginUserService,
};
