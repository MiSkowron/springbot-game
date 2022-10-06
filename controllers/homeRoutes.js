const router = require("express").Router();
const { Score, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get("/", async (req, res) => {
//   try {
//     // Get all scores and JOIN with user data
//     const scoreData = await Score.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const scores = scoreData.map((score) => score.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render("login", {
//       scores,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    // Get all scores and JOIN with user data
    const scoreData = await Score.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const scores = scoreData.map((score) => score.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("game", {
      scores,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["username", "ASC"]],
      include: [{ model: Score }],
    });

    const users = userData.map((score) => score.get({ plain: true }));

    res.render("profile", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/scores", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["username", "ASC"]],
      include: [{
         model: Score,
         order:[["score","DESC"]], 
       }],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    const scores = users.map((user) => user.scores.map((score) => ({
      username: user.username,
      score: score.score 
    })));
    const scoreData = scores.flat().sort((a,b) => b.score - a.score).slice(0,10);
    res.render("scores", {
      scores: scoreData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
