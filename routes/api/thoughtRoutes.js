const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  updateReactions,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(updateReactions);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;