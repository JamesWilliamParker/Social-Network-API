const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../controllers/thoughtController');

// Route for all thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Route for specific thought by ID
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Route for reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// Route for removing a reaction
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
