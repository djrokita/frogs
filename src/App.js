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
        sex: 'frog male'
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
      let rowMaxMove = row + 3 < 6 ? row + 3 : 6;
      let rowMinMove = row - 3 < 1 ? 1 : row - 3;
      let colMaxMove = col + 3 < 10 ? col + 3 : 10;
      let colMinMove = col - 3 < 1 ? 1 : col - 3;
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
      const frogsArr = frogs.filter(frog => frog.id !== selectedFrogId);
      const movedFrogsArr = [...frogsArr, {id: selectedFrogId, row: selectedField.row, col: selectedField.col, sex: 'frog male'}];
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
