const router = require('express').Router();
let Score = require('../models/score.model');

router.route('/add').post((req, res) => {
  const score = Number(req.body.score)
  var date = new Date(req.body.date)
  date.setHours(0, 0, 0, 0)

  console.log(date);

  const newScore = new Score({
    score,
    date,
  });

  newScore.save()
  .then(() => res.json('Score added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get').get((req,res) =>{
  Score.find().sort({date: -1, updatedAt: -1})
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
