const express = require('express');
const router = express.Router();

// Log the user out and destroy the session
router.post('/', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

module.exports = router;