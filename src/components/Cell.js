import React from 'react'

const Cell = ({cols, handler, col, frogCol}) => {

    return (
            <td>
                <label name={col}>
                    <input type="checkbox" />
                </label>
            </td>
        );
}

export default Cell;