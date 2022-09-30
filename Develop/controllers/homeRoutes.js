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

// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["username", "ASC"]],
      include: [{ model: Score }],
    });

    const users = userData.map((score) => score.get({ plain: true }));
    console.log("checking log in status: " + req.session.logged_in);
    res.render("game", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//game
router.get("/game", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["username", "ASC"]],
      include: [{ model: Score }],
    });

    const users = userData.map((score) => score.get({ plain: true }));
    console.log("checking log in status: " + req.session.logged_in);
    res.render("game", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }

  // res.render('game', {
  //   users,
  //   logged_in: req.session.logged_in,
  // });
});

router.get("/scores", (req, res) => {
  res.render("scores");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
