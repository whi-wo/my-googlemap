import React, { Component } from 'react';
import './App.css';

class Error extends Component {
  state = {
    errMsg: 'There was an error loading Google Maps API, please try again'
  }

  render() {
    return (

      <h1 className='error'>{this.state.errMsg}</h1>
    )
  }
}

export default Error;
