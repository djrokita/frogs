import React from 'react'
import Cell from './Cell';

const Row = ({cols, handler}) => {

    const fields = cols.map((field, index) => {
        return <Cell key={index}/>;
    });

    return (
        <tr>
            {fields}
        </tr>
    );
}

export default Row;