const verifyRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }
  };
};

export default verifyRole;
