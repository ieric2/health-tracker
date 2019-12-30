import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, DiscreteColorLegend} from 'react-vis';


export default class Exercise extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      goals: [],
      ideal: [],
      hours: 0,
      hoursGoal: 0,
      date: new Date(),
      legend: ["User Data", "Recommended Level", "Goal"]
    }

    this.onChangeHours = this.onChangeHours.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onChangeHoursGoal = this.onChangeHoursGoal.bind(this);
    this.onSubmitGoal = this.onSubmitGoal.bind(this);
  }

  componentDidMount() {
    var goalHours = 21
    axios.get('http://localhost:5000/exercise_goal/')
    .then(response =>{
      if(response.data.length >= 1){
        goalHours = response.data[0]['hours']
      }
    })
    var e = []
    var f = []
    var g = []
    axios.get('http://localhost:5000/exercise_track/')
     .then(response => {
        var newArray = []
        var uniqueObject = {};
        for (var i = response.data.length - 1; i >= 0; i--){
          var date = response.data[i]['date']
          uniqueObject[date] = response.data[i]
        }

        for (i in uniqueObject) {
          newArray.push(uniqueObject[i]);
        }


        e = newArray.map((exercise)=>{
          return {x: new Date(exercise.date), y: exercise.hours}
        });

        this.setState({
          exercises: e
        });

        f = response.data.map((exercise)=>{
          return {x: new Date(exercise.date), y: 21}
        });
        this.setState({
          ideal: f
        });

        g = response.data.map((exercise)=>{
          return {x: new Date(exercise.date), y: goalHours}
        });
        this.setState({
          goals: g
        });
      })
     .catch((error) => {
        console.log(error);
     })
  }

  onChangeHours(e) {
    this.setState({
      hours: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      hours: this.state.hours,
      date: this.state.date,
    };
    console.log(exercise);
    if (this.state.exercises.length > 0){
      if (exercise.date.getTime() - 86400000 > this.state.exercises[this.state.exercises.length - 1]['x'].getTime()){
        alert("Don't forget to log your activity daily :)")
      }
    }

    axios.post('http://localhost:5000/exercise_track/add', exercise).then(res => console.log(res.data));

  }

  onChangeHoursGoal(e) {
    this.setState({
      hoursGoal: e.target.value
    });
  }

  onSubmitGoal(e) {
    e.preventDefault();
    console.log(this.state.hoursGoal)
    const exercise = {
      hours: this.state.hoursGoal,
    };
    console.log(exercise);
    axios.post('http://localhost:5000/exercise_goal/add', exercise)
    .then(res => console.log(res.data))
    .catch(error => {
      console.log(error.response)
    })

  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Minutes: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.hours}
                onChange={this.onChangeHours}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
        <h3>Set New Exercise Goal</h3>
        <form onSubmit={this.onSubmitGoal}>
          <div className="form-group">
            <label>Minutes: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.hoursGoal}
                onChange={this.onChangeHoursGoal}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Set Exercise Goal" className="btn btn-primary" />
          </div>
        </form>
        <h3>View Exercise History</h3>
        <XYPlot xType="time" height={300} width= {300}>
          <HorizontalGridLines />
          <XAxis title="Date" />
          <YAxis title="Minutes Exercised"/>
          <DiscreteColorLegend items={this.state.legend} type="horizontal"/>
            <LineSeries data={this.state.exercises} />
            <LineSeries data={this.state.ideal} />
            <LineSeries data={this.state.goals} />
        </XYPlot>
      </div>
    )
  }
}
