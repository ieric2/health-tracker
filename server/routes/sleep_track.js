const router = require('express').Router();
let SleepTrack = require('../models/sleep_track.model');

router.route('/').get((req, res) => {
  SleepTrack.find().sort({date: -1, updatedAt: -1})
    .then(sleeps => res.json(sleeps))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const hours = Number(req.body.hours)
  var date = new Date(req.body.date)
  date.setHours(0, 0, 0, 0)

  console.log(date);

  const newSleep = new SleepTrack({
    hours,
    date,
  });

  newSleep.save()
  .then(() => res.json('Sleep added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getOne').get((req,res) =>{
  SleepTrack.find().sort({date: -1, updatedAt: -1}).limit(1)
    .then(sleeps => res.json(sleeps))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
