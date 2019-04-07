import React from 'react';
import Row from './Row';
import { columnsNumbers,  rowsNumbers } from './../initialState';

const Lake = ({frogs, handler, selectedField, moveableFields}) => {
    const { rowMoveRange, colMoveRange } = moveableFields;
    const isRowInRange = (row) => rowMoveRange.find((val) => row === val);

    const rowsGrid = rowsNumbers.map((num, index) => {
        return <Row cols={columnsNumbers}
                    key={index}
                    row={num}
                    frogs={frogs}
                    handler={handler}
                    selectedField={selectedField}
                    selectedRow={selectedField.row === num ? true : false}
                    rowMoveRange={isRowInRange(num)}
                    colMoveRange={colMoveRange}
                />
    });

    return (
        <table id="lake">
            <thead>
                <tr>
                    <th colSpan="10">Lake</th>
                </tr>
            </thead>
            <tbody>
                {rowsGrid}
            </tbody>
        </table>
    );
}

export default Lake;