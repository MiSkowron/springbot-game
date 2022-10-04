const router = require('express').Router();
const { Score } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
  try {
    const newScore = await Score.create({
      score: req.body.score,
      user_id: req.session.user_id,
    });

    res.status(200).json(newScore);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;