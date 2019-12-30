const router = require('express').Router();
let WaterGoal = require('../models/water_goal.model');

router.route('/').get((req, res) => {
  WaterGoal.find().sort({updatedAt: -1}).limit(1)
    .then(waters => res.json(waters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const cups = Number(req.body.cups)

  const newWater = new WaterGoal({
    cups,
  });

  newWater.save()
  .then(() => res.json('Goal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
