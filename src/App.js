import React, { Component, Fragment } from 'react';
import './App.css';
import Lake from './components/Lake';
import Legend from './components/Legend';
import {setReproduceFields, checkParentsGender, checkReproduceRange, setFrogeMoveRange, setBabyFrogGender, setBabyFrogId, setBabyFrogField, setBabyFrogCharacteristics} from './utils';
import * as init from './initialState';

class App extends Component {

  state = {
    frogs: [
      {
        id: 1,
        row: 1,
        col: 1,
        sex: 'frog male',
        characteristics: ['tall', 'slim'],
        reproduceFields: []
      },
      {
        id: 2,
        row: 6,
        col: 10,
        sex: 'frog female',
        characteristics: ['shart', 'fat'],
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
      let range = selectedFrog.sex === 'frog male' ? 3 : 2;
      const { rowMoveRange, colMoveRange } = setFrogeMoveRange(range, row, col);
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
      const isHeteroParents = checkParentsGender(firstSelectedFrog, secondSelectedFrog);
      const parentFrog = checkReproduceRange(firstSelectedFrog, secondSelectedFrog);
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
        ...selectedFrog,
        id: selectedFrogId,
        row,
        col,
        reproduceFields: setReproduceFields(row, col)
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
        const babyField = setBabyFrogField(this.state.fieldsForBaby);
        const { row, col } = this.state.fieldsForBaby[babyField];
        const babyFrog = {
          id: setBabyFrogId(this.state.frogs),
          row,
          col,
          reproduceFields: [],
          characteristics: setBabyFrogCharacteristics(init.height, init.weight),
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
    const { frogs, selectedField, moveableFields, action, msg } = this.state;
    const lakeProps = {
      frogs,
      selectedField,
      moveableFields,
      handler: this.inputHandler,
    };
    const legendProps = {
      jump: this.frogsJumpSubmit,
      reproduce: this.frogReproduceSubmit,
      action,
      msg
    };
    return (
      <Fragment>
        <Lake {...lakeProps} />
        <Legend {...legendProps} />
      </Fragment>
    );
  }
}

export default App;
