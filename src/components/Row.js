import React from 'react'
import Cell from './Cell'

const Row = ({cols, handler, row, frogs, selectedField, selectedRow, rowMoveRange, colMoveRange}) => {
    const frogsInRow = frogs.filter(frog => frog.row === row);
    const isColInRange = (col) => colMoveRange.find((val) => col === val);

    const fields = cols.map((num, index) => {
        return <Cell
            key={index}
            row={row}
            col={num}
            frogs={frogsInRow}
            handler={handler}
            selectedFieled={selectedField}
            selected={selectedRow && selectedField.col === num}
            rowMoveRange={!!rowMoveRange}
            colMoveRange={isColInRange(num)}
            />;
    });

    return (
        <tr>
            {fields}
        </tr>
    );
}

export default Row;