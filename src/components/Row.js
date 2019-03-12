import React from 'react'
import Cell from './Cell'

const Row = ({cols, handler, row, frogs, selectedField, selectedRow}) => {

    const frogsInRow = frogs.filter(frog => frog.row === row);

    const fields = cols.map((num, index) => {
        return <Cell key={index} row={row} col={num} frogs={frogsInRow} handler={handler} selectedFieled={selectedField} selected={selectedRow && selectedField.col === num} />;
    });

    return (
        <tr>
            {fields}
        </tr>
    );
}

export default Row;