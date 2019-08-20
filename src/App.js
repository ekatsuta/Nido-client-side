import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer'
import Nav from './containers/Nav'

function App(props) {
  console.log("APP", props)
  return (
    <div className="App">
      <Nav routerProps={props}/>
      <MainContainer />
    </div>
  );
}

export default App;
