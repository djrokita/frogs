import React from 'react'

const Row = ({rows, handler}) => {
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
        <tr>
            {fields}
        </tr>
    );
}

export default Row;