const router = require('express').Router();
let SleepGoal = require('../models/sleep_goal.model');

router.route('/').get((req, res) => {
  SleepGoal.find().sort({updatedAt: -1}).limit(1)
    .then(sleeps => res.json(sleeps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const hours = Number(req.body.hours)

  const newSleep = new SleepGoal({
    hours,
  });

  newSleep.save()
  .then(() => res.json('Goal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
