import React, { Component, Fragment } from 'react';
import './App.css';
import Lake from './components/Lake'
import Legend from './components/Legend';

class App extends Component {

  state = {
    frogs: [
      {
        id: 1,
        row: 1,
        col: 1
      }
    ]
  }

  // frogsMoveHandler = (e) => {
  //   const {id} = e.target;
  //   const { rows } = this.state;
  //   let chengedRows = rows.map(item => {
  //     if (item.id === id) return {id, checked: true};
  //     return item;
  //   });
  //   this.setState({rows: chengedRows});
  // }

  // frogsJumpSubmit = (e) => {
  //   const rows = this.state.rows.map(item => {
  //     if (item.checked) return {id: item.id, frog: 'frog male', checked: false};
  //     return {id: item.id, checked: false};
  //   });
  //   this.setState({rows});
  // }

  render() {
    return (
      <Fragment>
        <Lake frogs={this.state.frogs} moveHandler={this.frogsMoveHandler}/>
        <Legend jump={this.frogsJumpSubmit} />
      </Fragment>
    );
  }
}

export default App;
