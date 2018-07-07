//Dependencies
const router = require('express').Router();
const userRoutes = require('./users');

//User Routes
router.use('/users', userRoutes);

module.exports = router;
