const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const waterTrackSchema = new Schema({
  cups: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const WaterTrack = mongoose.model('WaterTrack', waterTrackSchema);

module.exports = WaterTrack;
