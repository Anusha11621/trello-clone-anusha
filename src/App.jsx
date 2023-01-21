import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import Boards from './Components/Boards'
import { Switch,Route } from 'react-router-dom'
import Lists from './Components/Lists'
export default class App extends Component {
  render() {
    return (
      <>
      <Navbar></Navbar>
      <Switch>
          <Route exact path="/" component={Boards} />
          <Route exact path="/:id" component={Lists} />
      </Switch>

      </>
    )
  }
}

