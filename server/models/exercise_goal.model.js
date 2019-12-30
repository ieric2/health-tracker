const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseGoalSchema = new Schema({
  hours: { type: Number, required: true },
}, {
  timestamps: true,
});

const ExerciseGoal = mongoose.model('ExerciseGoal', exerciseGoalSchema);

module.exports = ExerciseGoal;
