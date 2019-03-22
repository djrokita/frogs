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
        sex: 'frog male',
        reproduceFields: []
      },
      {
        id: 2,
        row: 1,
        col: 2,
        sex: 'frog female',
        reproduceFields: []
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
    },
    action: null
  }

  setReproduceFields(frog) {
    const { row, col } = frog;
    let rowMaxReproduce = row + 1 < 6 ? row + 1 : 6;
    let rowMinReproduce = row - 1 < 1 ? 1 : row - 1;
    let colMaxReproduce = col + 1 < 10 ? col + 1 : 10;
    let colMinReproduce = col - 1 < 1 ? 1 : col - 1;
    let reproduceFields = [];
    for (let i = rowMinReproduce; i <= rowMaxReproduce; i++) {
      let obj = {row: i};
      for (let j = colMinReproduce; j <= colMaxReproduce; j++) {
        obj = {...obj, col: j }
        reproduceFields = [...reproduceFields, obj];
      }
    }
    return reproduceFields.filter(field => {
      return field.row !== row || field.col !== col;
    });
  }

  inputHandler = (row, col, selectedFrogId) => {
    const selectedField = {row, col};
    const { frogs } = this.state;
    if (selectedFrogId && !this.state.selectedFrogId) {
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
        moveableFields: {rowMoveRange, colMoveRange},
        action: 'jump'
      });
    }
    if (selectedFrogId && this.state.selectedFrogId) {
      let [ firstSelectedFrog ] = frogs.filter(frog => frog.id === this.state.selectedFrogId);
      let [ secondSelectedFrog ] = frogs.filter(frog => frog.id === selectedFrogId);
      const { reproduceFields } = firstSelectedFrog;
      let parentFrog = reproduceFields.filter(field => {
        return field.row === secondSelectedFrog.row && field.col === secondSelectedFrog.col;
      });
      this.setState({
        selectedField,
        action: 'reproduce'
      });
    }
    else this.setState({selectedField});
  }

  frogsJumpSubmit = () => {
    const { selectedField, selectedFrogId, frogs } = this.state;
    if (selectedFrogId) {
      let [ selectedFrog ] = frogs.filter(frog => frog.id === selectedFrogId);
      const frogsArr = frogs.filter(frog => frog.id !== selectedFrogId);
      const movedFrog = {
        id: selectedFrogId,
        row: selectedField.row,
        col: selectedField.col,
        sex: selectedFrog.sex,
        reproduceFields: this.setReproduceFields(selectedFrog)
      }
      const movedFrogsArr = [...frogsArr, movedFrog];
      this.setState({
        frogs: movedFrogsArr,
        selectedFrogId: null,
        moveableFields: {
          rowMoveRange: [],
          colMoveRange: []
        }
      });
    }
  }

  frogReproduceSubmit = () => {
    if (this.state.action === 'reproduce') {
      const babyFrog = {
        id: 3,
        row: 1,
        col: 10,
        sex: 'frog male'
      }
      const frogs = [...this.state.frogs, babyFrog];
      this.setState({frogs});
    }
  }

  render() {
    const { selectedField, moveableFields, action } = this.state;
    return (
      <Fragment>
        <Lake frogs={this.state.frogs}
              handler={this.inputHandler}
              moveHandler={this.frogsMoveHandler}
              selectedField={selectedField}
              moveableFields={moveableFields}
              />
        <Legend jump={this.frogsJumpSubmit} reproduce={this.frogReproduceSubmit} action={action} />
      </Fragment>
    );
  }
}

export default App;
