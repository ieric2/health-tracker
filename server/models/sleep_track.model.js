const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sleepTrackSchema = new Schema({
  hours: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const SleepTrack = mongoose.model('SleepTrack', sleepTrackSchema);

module.exports = SleepTrack;
