const router = require('express').Router();
let ExerciseGoal = require('../models/exercise_goal.model');

router.route('/').get((req, res) => {
  ExerciseGoal.find().sort({updatedAt: -1}).limit(1)
    .then(exercises => {
      res.json(exercises)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const hours = Number(req.body.hours)

  const newExercise = new ExerciseGoal({
    hours,
  });

  newExercise.save()
  .then(() => res.json('Goal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
