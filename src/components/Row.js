import React from 'react'

const Row = ({rows, handler, rowNumber}) => {
    const fields = rows.map((field, index) => {
        return (
            <td key={index}>
                <label className={field.frog}>
                    <input type="checkbox" id={field.id} name={field.frog} data={field.frog} value={field.checked} onChange={handler}/>
                </label>
            </td>
        );
    });

    return (
        <tr id={rowNumber} >
            {fields}
        </tr>
    );
}

export default Row;