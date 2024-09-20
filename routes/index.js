const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Use user routes
router.use('/users', userRoutes);

// Use thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;
