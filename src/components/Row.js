import React, { Fragment } from 'react'

const Row = ({cols, handler, col, frogCol}) => {
    console.log('TCL: Row -> rows', cols);

    const fields = cols.map((field, index) => {
        return (
            <td key={index}>
                <label name={col}>
                    <input type="checkbox" id={field} />
                </label>
            </td>
        );
    });

    return (
        <Fragment>
            {fields}
        </Fragment>
    );
}

export default Row;