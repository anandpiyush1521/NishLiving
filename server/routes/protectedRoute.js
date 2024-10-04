const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access to protected route granted.", user: req.user });
});

module.exports = router;
