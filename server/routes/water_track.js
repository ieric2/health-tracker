const router = require('express').Router();
let WaterTrack = require('../models/water_track.model');

router.route('/').get((req, res) => {
  WaterTrack.find().sort({date: -1, updatedAt: -1})
    .then(waters => res.json(waters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const cups = Number(req.body.cups)
  var date = new Date(req.body.date)
  date.setHours(0, 0, 0, 0)

  console.log(date);

  const newWater = new WaterTrack({
    cups,
    date,
  });

  newWater.save()
  .then(() => res.json('Water added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getOne').get((req,res) =>{
  WaterTrack.find().sort({date: -1, updatedAt: -1}).limit(1)
    .then(waters => res.json(waters))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
