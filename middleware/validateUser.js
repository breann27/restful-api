 const validateUser = (req, res, next) => {
    const { firstName, lastName, hobby } = req.body;
    if (!firstName || !lastName || !hobby) {
      return res.status(400).json({ error: "firstName, lastName and hobby are required" });
    }
    next();
  };
  
  module.exports = validateUser;
  