import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, DiscreteColorLegend} from 'react-vis';


export default class Water extends Component {

  constructor(props) {
    super(props);
    this.state = {
      waters: [],
      goals: [],
      ideal: [],
      cups: 0,
      cupsGoal: 0,
      date: new Date(),
      legend: ["User Data", "Recommended Level", "Goal"]
    }

    this.onChangeCups = this.onChangeCups.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onChangeCupsGoal = this.onChangeCupsGoal.bind(this);
    this.onSubmitGoal = this.onSubmitGoal.bind(this);
  }

  componentDidMount() {
    var goalCups = 13
    axios.get('http://localhost:5000/water_goal/')
    .then(response =>{
      if(response.data.length >= 1){
        goalCups = response.data[0]['cups']
      }
    })
    var e = []
    var f = []
    var g = []
    axios.get('http://localhost:5000/water_track/')
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


        e = newArray.map((water)=>{
          return {x: new Date(water.date), y: water.cups}
        });

        this.setState({
          waters: e
        });

        f = response.data.map((water)=>{
          return {x: new Date(water.date), y: 13}
        });
        this.setState({
          ideal: f
        });

        g = response.data.map((water)=>{
          return {x: new Date(water.date), y: goalCups}
        });
        this.setState({
          goals: g
        });
      })
     .catch((error) => {
        console.log(error);
     })
  }

  onChangeCups(e) {
    this.setState({
      cups: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const water = {
      cups: this.state.cups,
      date: this.state.date,
    };
    console.log(water);
    if(this.state.waters.length > 0){
      if (water.date.getTime() - 86400000 > this.state.waters[this.state.waters.length - 1]['x'].getTime()){
        alert("Don't forget to log your activity daily :)")
      }
    }

    axios.post('http://localhost:5000/water_track/add', water).then(res => console.log(res.data));

  }

  onChangeCupsGoal(e) {
    this.setState({
      cupsGoal: e.target.value
    });
  }

  onSubmitGoal(e) {
    e.preventDefault();
    console.log(this.state.cupsGoal)
    const water = {
      cups: this.state.cupsGoal,
    };
    console.log(water);
    axios.post('http://localhost:5000/water_goal/add', water)
    .then(res => console.log(res.data))
    .catch(error => {
      console.log(error.response)
    })

  }

  render() {
    return (
      <div>
        <h3>Create New Water Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Cups: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.cups}
                onChange={this.onChangeCups}
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
            <input type="submit" value="Create Water Log" className="btn btn-primary" />
          </div>
        </form>
        <h3>Set New Water Goal</h3>
        <form onSubmit={this.onSubmitGoal}>
          <div className="form-group">
            <label>Cups: </label>
            <input
                type="text"
                className="form-control"
                value={this.state.cupsGoal}
                onChange={this.onChangeCupsGoal}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Set Water Goal" className="btn btn-primary" />
          </div>
        </form>
        <h3>View Water History</h3>
        <XYPlot xType="time" height={300} width= {300}>
          <HorizontalGridLines />
          <XAxis title="Date" />
          <YAxis title="Cups Drank"/>
          <DiscreteColorLegend items={this.state.legend} type="horizontal"/>
            <LineSeries data={this.state.waters} />
            <LineSeries data={this.state.ideal} />
            <LineSeries data={this.state.goals} />
        </XYPlot>
      </div>
    )
  }
}
