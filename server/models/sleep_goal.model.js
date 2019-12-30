const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sleepGoalSchema = new Schema({
  hours: { type: Number, required: true },
}, {
  timestamps: true,
});

const SleepGoal = mongoose.model('SleepGoal', sleepGoalSchema);

module.exports = SleepGoal;
