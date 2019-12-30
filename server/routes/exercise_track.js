const router = require('express').Router();
let ExerciseTrack = require('../models/exercise_track.model');

router.route('/').get((req, res) => {
  ExerciseTrack.find().sort({date: -1, updatedAt: -1})
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const hours = Number(req.body.hours)
  var date = new Date(req.body.date)
  date.setHours(0, 0, 0, 0)

  console.log(date);

  const newExercise = new ExerciseTrack({
    hours,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getOne').get((req,res) =>{
  ExerciseTrack.find().sort({date: -1, updatedAt: -1}).limit(1)
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
