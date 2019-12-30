const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseTrackSchema = new Schema({
  hours: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const ExerciseTrack = mongoose.model('ExerciseTrack', exerciseTrackSchema);

module.exports = ExerciseTrack;
