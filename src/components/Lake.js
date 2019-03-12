import React from 'react';
import Row from './Row';

const Lake = (props) => {
    const { frogs } = props;
    const columnsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const rowsNumbers = [1, 2, 3, 4, 5, 6];

    const frogRow = frogs.map(frog => frog.row);
    const frogCol = frogs.map(frog => frog.col);

    const rowsGrid = rowsNumbers.map((num, index) => {
        return frogCol.map(colNum => {
            if (colNum == num) {
                return (
                    <tr key={index}>
                        <Row cols={columnsNumbers} />
                    </tr>
                );
            }
            else {
                return (
                    <tr key={index}>
                        <Row cols={columnsNumbers} />
                    </tr>
                );
            }
        });
        // const colFrog = frogs.map(frog => frog.col);
        // const rowFrog = frogs.map(frog => frog.row);
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