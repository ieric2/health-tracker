import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component"
import Home from "./components/home.component"
import Exercise from "./components/exercise.component"
import Sleep from "./components/sleep.component"
import Water from "./components/water.component"


function App() {
 return (
   <Router>
     <div className="container">
       <Navbar />
       <br/>
       <Route path="/home" component={Home} />
       <Route path="/exercise" component={Exercise} />
       <Route path="/sleep" component={Sleep} />
       <Route path="/water" component={Water} />
     </div>
   </Router>
 );
}

export default App;
