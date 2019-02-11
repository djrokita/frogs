import React, { Component, Fragment } from 'react';
import './App.css';
import Lake from './components/Lake'
import Legend from './components/Legend';

class App extends Component {

  state = {
    rows: [
      {
        id: '1',
        frog: 'frog male',
        checked: false
      },
      {
        id: '2',
        frog: 'frog female',
        checked: false
      },
      {
        id: '3',
        checked: false
      },
      {
        id: '4',
        checked: false
      },
      {
        id: '5',
        checked: false
      },
      {
        id: '6',
        checked: false
      },
      {
        id: '7',
        checked: false
      },
      {
        id: '8',
        checked: false
      },
      {
        id: '9',
        checked: false
      },
      {
        id: '10',
        checked: false
      }
    ],
    selectedFrogs: ''
  }

  frogsMoveHandler = (e) => {
    const {id} = e.target;
    const { rows } = this.state;
    let chengedRows = rows.map(item => {
      if (item.id === id) return {id, checked: true};
      return item;
    });
    this.setState({rows: chengedRows});
  }

  frogsJumpSubmit = (e) => {
    const rows = this.state.rows.map(item => {
      if (item.checked) return {id: item.id, frog: 'frog male', checked: false};
      return {id: item.id, checked: false};
    });
    this.setState({rows});
  }

  render() {
    return (
      <Fragment>
        <Lake {...this.state} moveHandler={this.frogsMoveHandler}/>
        <Legend jump={this.frogsJumpSubmit} />
      </Fragment>
    );
  }
}

export default App;
