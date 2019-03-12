import React, { Component } from 'react'

class Cell extends Component {
    row = this.props.row;
    col = this.props.col;

    state = {
        // frog: {id: 0}
    }

    static getDerivedStateFromProps(props, state) {
        const [ frog ]  = props.frogs.filter(frog => frog.col === props.col);
        // if (frog) return { frog };
        // else return { frog: {id: 0}};
        return { frog };
    }

    render() {
        const { handler, col, selected } = this.props;
        const { frog } = this.state;

        return (
            <td>
                <label name={col} className={frog ? frog.sex : ''}>
                    <input type="checkbox" onChange={() => handler(this.row, this.col, frog ? frog.id : 0)} checked={selected}/>
                </label>
            </td>
        );
    }
};

export default Cell;