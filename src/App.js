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
        col: 1,
        sex: 'frog male'
      },
    ],
    selectedFrogId: null,
    selectedField: {
      row: null,
      col: null
    }
  }

  inputHandler = (row, col, selectedFrogId) => {
    const selectedField = {row, col};
    if (selectedFrogId) this.setState({selectedField, selectedFrogId});
    else this.setState({selectedField});
  }

  frogsJumpSubmit = () => {
    const { selectedField, selectedFrogId, frogs } = this.state;
    if (selectedFrogId) {
      const frogsArr = frogs.filter(frog => frog.id !== selectedFrogId);
      const movedFrogsArr = [...frogsArr, {id: selectedFrogId, row: selectedField.row, col: selectedField.col, sex: 'frog male'}];
      this.setState({frogs: movedFrogsArr});
    }
  }

  render() {
    const { selectedField } = this.state;
    return (
      <Fragment>
        <Lake frogs={this.state.frogs} handler={this.inputHandler} moveHandler={this.frogsMoveHandler} selectedField={selectedField}/>
        <Legend jump={this.frogsJumpSubmit} />
      </Fragment>
    );
  }
}

export default App;
