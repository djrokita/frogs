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
      {
        id: 2,
        row: 1,
        col: 2,
        sex: 'frog female'
      },
    ],
    selectedFrogId: null,
    selectedField: {
      row: null,
      col: null
    },
    moveableFields: {
      rowMoveRange: [],
      colMoveRange: []
    }
  }

  inputHandler = (row, col, selectedFrogId) => {
    const selectedField = {row, col};
    if (selectedFrogId) {
      const { frogs } = this.state;
      let [ selectedFrog ] = frogs.filter(frog => frog.id === selectedFrogId);
      const range = selectedFrog.sex === 'frog male' ? 3 : 2;
      let rowMaxMove = row + range < 6 ? row + range : 6;
      let rowMinMove = row - range < 1 ? 1 : row - range;
      let colMaxMove = col + range < 10 ? col + range : 10;
      let colMinMove = col - range < 1 ? 1 : col - range;
      let rowMoveRange = [];
      let colMoveRange = [];
      for (let i = rowMinMove; i <= rowMaxMove; i++) {
        rowMoveRange = [...rowMoveRange, i];
      }
      for (let i = colMinMove; i <= colMaxMove; i++) {
        colMoveRange = [...colMoveRange, i]
      }
      this.setState({
        selectedField,
        selectedFrogId,
        moveableFields: {rowMoveRange, colMoveRange}
      });
    }
    else this.setState({selectedField});
  }

  frogsJumpSubmit = () => {
    const { selectedField, selectedFrogId, frogs } = this.state;
    if (selectedFrogId) {
      let [ selectedFrog ] = frogs.filter(frog => frog.id === selectedFrogId);
      const frogsArr = frogs.filter(frog => frog.id !== selectedFrogId);
      const movedFrogsArr = [...frogsArr, {id: selectedFrogId, row: selectedField.row, col: selectedField.col, sex: selectedFrog.sex}];
      this.setState({
        frogs: movedFrogsArr,
        moveableFields: {
          rowMoveRange: [],
          colMoveRange: []
        }
      });
    }
  }

  render() {
    const { selectedField, moveableFields } = this.state;
    return (
      <Fragment>
        <Lake frogs={this.state.frogs}
              handler={this.inputHandler}
              moveHandler={this.frogsMoveHandler}
              selectedField={selectedField}
              moveableFields={moveableFields}
              />
        <Legend jump={this.frogsJumpSubmit} />
      </Fragment>
    );
  }
}

export default App;
