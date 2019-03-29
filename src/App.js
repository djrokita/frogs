import React, { Component, Fragment } from 'react';
import './App.css';
import Lake from './components/Lake';
import Legend from './components/Legend';
import {setBabyFrogGender, setBabyFrogId, setBabyField} from './utils';

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
    fieldsForBaby: null,
    selectedFrogId: null,
    selectedField: {
      row: null,
      col: null
    },
    moveableFields: {
      rowMoveRange: [],
      colMoveRange: []
    },
    action: null,
    msg: ''
  }

  setReproduceFields(row, col) {
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

  checkParentsGender(frog1, frog2) {
    return frog1.sex !== frog2.sex ? true : false;
  }

  checkReproduceRange(frog1, frog2) {
    let frogInRange = [];
    if (frog1.reproduceFields.length) {
      frogInRange = frog1.reproduceFields.filter(field => {
        return field.row === frog2.row && field.col === frog2.col;
      });
    }
    else {
      frogInRange = frog2.reproduceFields.filter(field => {
        return field.row === frog1.row && field.col === frog1.col;
      });
    }
    return frogInRange.length;
  }

  searchForBabyFrogPlace({sex, reproduceFields}) {
    if (sex === 'frog female') {
      this.state.frogs.forEach(frog => {
        reproduceFields = reproduceFields.filter(field => {
          return field.row !== frog.row || field.col !== frog.col;
        })
      });
      return reproduceFields;
    }
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
      const isHeteroParents = this.checkParentsGender(firstSelectedFrog, secondSelectedFrog);
      const parentFrog = this.checkReproduceRange(firstSelectedFrog, secondSelectedFrog);
      const fieldsForBaby = firstSelectedFrog.sex === 'frog female' ? this.searchForBabyFrogPlace(firstSelectedFrog) : this.searchForBabyFrogPlace(secondSelectedFrog);
      if (isHeteroParents && parentFrog) {
        this.setState({
          selectedField,
          fieldsForBaby,
          action: 'reproduce'
        });
      }
    }
    else this.setState({selectedField});
  }

  frogsJumpSubmit = () => {
    const { selectedField: {row, col}, selectedFrogId, frogs } = this.state;
    if (selectedFrogId) {
      let [ selectedFrog ] = frogs.filter(frog => frog.id === selectedFrogId);
      const frogsArr = frogs.filter(frog => frog.id !== selectedFrogId);
      const movedFrog = {
        id: selectedFrogId,
        row,
        col,
        sex: selectedFrog.sex,
        reproduceFields: this.setReproduceFields(row, col)
      }
      const movedFrogsArr = [...frogsArr, movedFrog];
      this.setState({
        frogs: movedFrogsArr,
        selectedField: {
          row: null,
          col: null
        },
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
      if (this.state.fieldsForBaby.length) {
        const babyField = setBabyField(this.state.fieldsForBaby);
        const { row, col } = this.state.fieldsForBaby[babyField];
        const babyFrog = {
          id: setBabyFrogId(this.state.frogs),
          row,
          col,
          reproduceFields: [],
          sex: `frog ${setBabyFrogGender()}`
        };
        const frogs = [...this.state.frogs, babyFrog];
        this.setState({
          frogs,
          selectedField: {
            row: null,
            col: null
          },
          selectedFrogId: null,
          moveableFields: {
            rowMoveRange: [],
            colMoveRange: []
          },
          action: null,
          msg: ''
        });
      }
      else {
        this.setState({
          selectedField: {
            row: null,
            col: null
          },
          selectedFrogId: null,
          moveableFields: {
            rowMoveRange: [],
            colMoveRange: []
          },
          action: null,
          msg: 'No place for another baby :('}, );
      }
    }
  }

  render() {
    const { selectedField, moveableFields, action, msg } = this.state;
    return (
      <Fragment>
        <Lake frogs={this.state.frogs}
              handler={this.inputHandler}
              moveHandler={this.frogsMoveHandler}
              selectedField={selectedField}
              moveableFields={moveableFields}
              />
        <Legend jump={this.frogsJumpSubmit} reproduce={this.frogReproduceSubmit} action={action} msg={msg}/>
      </Fragment>
    );
  }
}

export default App;
