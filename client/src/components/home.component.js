import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import 'react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import DatePicker from 'react-datepicker';


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      exerciseProgress: 0,
      exerciseGoal: 0,
      exercisePercentage: 0,
      sleepProgress:0,
      sleepGoal:0,
      sleepPercentage: 0,
      waterProgress: 0,
      waterGoal: 0,
      waterPercentage: 0,
      scores: [],
      date: new Date(),
      articles: [],
      video: "",
      message: "",
    }
    this.logScore = this.logScore.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.displayAlerts = this.displayAlerts.bind(this)
  }

  componentWillMount(){
    axios.get('http://localhost:5000/exercise_track/getOne')
    .then(response =>{
      if(response.data.length >= 1){
        this.setState({
          exerciseProgress: response.data[0]['hours']
        });
        console.log(this.state.exerciseProgress)
      }
    })
    .then(response =>{
      return axios.get('http://localhost:5000/exercise_goal/')
      .then(response =>{
        if(response.data.length >= 1){
          this.setState({
            exerciseGoal: response.data[0]['hours']
          });
        }
      })
    })
    .then(response => {
      var exercisePercentage = Math.round(this.state.exerciseProgress / this.state.exerciseGoal * 100)
      if (exercisePercentage > 100){
        exercisePercentage = 100
      }
      this.setState({
        exercisePercentage: exercisePercentage,
      })
    }).then(response => {
      return axios.get('http://localhost:5000/sleep_track/getOne')
      .then(response =>{
        if(response.data.length >= 1){
          this.setState({
          sleepProgress: response.data[0]['hours']
          });
        }
      })
      .then(response =>{
        return axios.get('http://localhost:5000/sleep_goal/')
        .then(response =>{
          if(response.data.length >= 1){
            this.setState({
              sleepGoal: response.data[0]['hours']
            });
          }
        })
      })
      .then(response => {
        var sleepPercentage = Math.round(this.state.sleepProgress / this.state.sleepGoal * 100)
        if (sleepPercentage > 100){
          sleepPercentage = 100
        }
        this.setState({
          sleepPercentage: sleepPercentage,
        })
      })
    }).then(response => {
      return axios.get('http://localhost:5000/water_track/getOne')
      .then(response =>{
        if(response.data.length >= 1){
          this.setState({
            waterProgress: response.data[0]['cups']
          });
        }
      })
      .then(response =>{
        return axios.get('http://localhost:5000/water_goal/')
        .then(response =>{
          if(response.data.length >= 1){
            this.setState({
              waterGoal: response.data[0]['cups']
            });
          }
        })
      })
      .then(response =>{
        var waterPercentage = Math.round(this.state.waterProgress / this.state.waterGoal * 100)
        if (waterPercentage > 100){
          waterPercentage = 100
        }
        this.setState({
          waterPercentage: waterPercentage
        })
      })
    }).then(response =>{
      return axios.get('http://localhost:5000/score/get')
      .then(response =>{
        var e = []
        var newArray = []
        var uniqueObject = {};
        for (var i = response.data.length - 1; i >= 0; i--){
          var date = response.data[i]['date']
          uniqueObject[date] = response.data[i]
        }

        for (i in uniqueObject) {
          newArray.push(uniqueObject[i]);
        }


        e = newArray.map((score)=>{
          return {x: new Date(score.date), y: score.score}
        });

        this.setState({
          scores: e
        });
        this.displayAlerts()
      })
    })




  }

  displayAlerts(){
    console.log("alerts")
    console.log(this.state.exercisePercentage)
    if (this.state.waterPercentage < 50){
      this.setState({
        video: "9iMGFqMmUFs",
        message: "Please drink more water to prevent deyhdration",
      })
    }
    else if (this.state.exercisePercentage < 50){
      this.setState({
        video: "DsVzKCk066g",
        message: "Please exercise more to prevent lethargy",
      })
    }
    else if (this.state.sleepPercentage < 50){
      this.setState({
        video: "WpkfMuXJnWI",
        message: "Please drink more water to prevent deyhdration",
      })
    }
    else{
      this.setState({
        video: "rNSnfXl1ZjU"
      })
    }

  }

  logScore(e) {
    e.preventDefault();
    const newScore = {
      score: this.state.exercisePercentage + this.state.sleepPercentage + this.state.waterPercentage,
      date: this.state.date
    };
    axios.post('http://localhost:5000/score/add', newScore)
    .then(res => {
      if (newScore.score < this.state.scores[this.state.scores.length - 1]["y"]){
        alert("Your score has gone down. Please try harder to meet your daily goals :P")
      }
      else{
        alert("Keep up the good work :)")
      }
    })
    .catch(error => {
      console.log(error.response)
    })

  }

  onChangeDate(date){
    this.setState({
      date: date
    });
  }

  render() {
    console.log(this.state.video)

    return (
      <div>
        <h3> HomePage </h3>
        <br/>
        <text> {this.state.message} </text>
        <br/>
        <text> Exercise Goal Progress </text>
        <ProgressBar now={this.state.exercisePercentage} label={`${this.state.exercisePercentage}%`}/>
        <text> Sleep Goal Progress </text>
        <ProgressBar now={this.state.sleepPercentage} label={`${this.state.sleepPercentage}%`}/>
        <text> Water Goal Progress </text>
        <ProgressBar now={this.state.waterPercentage} label={`${this.state.waterPercentage}%`}/>
        <br/>
        <b> Health Score :  {this.state.exercisePercentage + this.state.sleepPercentage + this.state.waterPercentage} </b>
        <br/>
        <form onSubmit={this.logScore}>
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
            <input type="submit" value="Create Score Log" className="btn btn-primary" />
          </div>
        </form>
        <br/>
        <h3>View Health Score History</h3>
        <XYPlot xType="time" height={300} width= {300}>
          <HorizontalGridLines />
          <XAxis title="Date" />
          <YAxis title="Hours Slept"/>
            <LineSeries data={this.state.scores} />
        </XYPlot>
        <br/>
        <text> Suggested Videos/Articles: </text>
        <div
          className="video"
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0
          }}
        >
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%"
            }}
            src={`https://www.youtube.com/embed/${this.state.video}`}
            frameBorder="0"
          />
        </div>


      </div>
    )
  }
}
