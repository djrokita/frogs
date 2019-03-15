import React, { Component } from 'react'

class Cell extends Component {
    row = this.props.row;
    col = this.props.col;

    state = {}

    static getDerivedStateFromProps(props, state) {
        const [ frog ]  = props.frogs.filter(frog => frog.col === props.col);
        return { frog };
    }

    render() {
        const { handler, col, selected, rowMoveRange, colMoveRange } = this.props;
        const { frog } = this.state;

        const setRange = () => {
            if (rowMoveRange && colMoveRange) return 'jump_range';
            else return '';
        };

        return (
            <td>
                <label name={col} className={frog ? frog.sex : '' || setRange()}>
                    <input
                        type="checkbox"
                        onChange={() => handler(this.row, this.col, frog ? frog.id : 0)} checked={selected}
                        disabled={!frog && !setRange()}
                        />
                </label>
            </td>
        );
    }
};

export default Cell;