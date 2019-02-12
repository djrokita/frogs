import React from 'react'
import Row from './Row';

const Lake = (props) => {
    const { frogs } = props;
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const columns = [1, 2, 3, 4, 5, 6];

    const row = rows.map((num, index) => {
        return (
            <td key={index}>
                <label>
                    <input type="checkbox" id={num} />
                </label>
            </td>
        );
    });

    const col = columns.map((num, index) => {
        return (
            <tr>
                {row}
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