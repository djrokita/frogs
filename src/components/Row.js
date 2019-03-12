import React from 'react'
import Cell from './Cell'

const Row = ({cols, handler, row, frogs}) => {

    const frogsInRow = frogs.filter(frog => frog.row === row);
	console.log('TCL: Row -> frogsInRow', frogsInRow);

    const fields = cols.map((num, index) => {
        return <Cell key={index} row={row} col={num} frogs={frogsInRow}/>;
    });

    return (
        <tr>
            {fields}
        </tr>
    );
}

export default Row;