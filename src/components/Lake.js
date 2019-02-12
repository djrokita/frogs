import React from 'react';
import Row from './Row';

const Lake = (props) => {
    const { frogs } = props;
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const columns = [1, 2, 3, 4, 5, 6];

    const col = columns.map((num, index) => {
        return (
            <tr key={index}>
                <Row rows={rows} col={num} />
            </tr>
        );
    });

    return (
        <table id="lake">
            <thead>
                <tr>
                    <th colSpan="10">Lake</th>
                </tr>
            </thead>
            <tbody>
                {col}
            </tbody>
        </table>
    );
}

export default Lake;