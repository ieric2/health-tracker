const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exerciseGoalRouter = require('./routes/exercise_goal');
const exerciseTrackRouter = require('./routes/exercise_track');
const sleepGoalRouter = require('./routes/sleep_goal');
const sleepTrackRouter = require('./routes/sleep_track');
const waterGoalRouter = require('./routes/water_goal');
const waterTrackRouter = require('./routes/water_track');
const scoreRouter = require('./routes/score');

app.use('/exercise_goal', exerciseGoalRouter);
app.use('/exercise_track', exerciseTrackRouter);
app.use('/sleep_goal', sleepGoalRouter);
app.use('/sleep_track', sleepTrackRouter);
app.use('/water_goal', waterGoalRouter);
app.use('/water_track', waterTrackRouter);
app.use('/score', scoreRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
