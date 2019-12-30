const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const waterGoalSchema = new Schema({
  cups: { type: Number, required: true },
}, {
  timestamps: true,
});

const WaterGoal = mongoose.model('WaterGoal', waterGoalSchema);

module.exports = WaterGoal;
