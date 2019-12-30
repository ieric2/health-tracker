import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/home" className="navbar-brand">HealthTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/exercise" className="nav-link">Exercise</Link>
          </li>
          <li className="navbar-item">
          <Link to="/sleep" className="nav-link">Sleep</Link>
          </li>
          <li className="navbar-item">
          <Link to="/water" className="nav-link">Water</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
