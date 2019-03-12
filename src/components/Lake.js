import React from 'react';
import Row from './Row';

const Lake = (props) => {
    const { frogs } = props;
    const columnsNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const rowsNumbers = [1, 2, 3, 4, 5, 6];

    const rowsGrid = rowsNumbers.map((num, index) => {
        return <Row cols={columnsNumbers} />
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