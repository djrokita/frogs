import React, { Fragment } from 'react'

const Row = ({rows, handler, col}) => {
    const fields = rows.map((field, index) => {
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