import React, { Component } from 'react'

class Cell extends Component {
    row = this.props.row;
    col = this.props.col;

    state = {
        hasFrog: false,
    }

    static getDerivedStateFromProps(props, state) {
        const [ frog ]  = props.frogs.filter(frog => frog.col === props.col);
		console.log('TCL: Cell -> staticgetDerivedStateFromProps -> frog', frog);
        return { frog };
    }

    render() {
        // console.log('cell-state', this.state.frog);
        const {handler, col} = this.props;
        const { frog } = this.state;

        return (
            <td>
                <label name={col} className={frog ? frog.sex : ''}>
                    <input type="checkbox" />
                    {this.row}, {this.col}
                </label>
            </td>
        );
    }
};

export default Cell;