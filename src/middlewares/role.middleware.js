const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      console.log('req.user',req.user.role);
      return res.status(403).json({
        message: "Access denied. Insufficient permissions"
      });
    }
    next();
  };
};

module.exports = roleMiddleware;
