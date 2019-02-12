import React from 'react'
import Row from './Row';

const Lake = (props) => {
    const { frogs } = props;
    return (
        <table id="lake">
            <thead>
                <tr>
                    <th colSpan="10">Lake</th>
                </tr>
            </thead>
            <tbody>
                <Row rows={props.rows} handler={props.moveHandler} rowNumber={1} />
                <Row rows={props.rows} handler={props.moveHandler} rowNumber={2} />
                <Row rows={props.rows} handler={props.moveHandler} rowNumber={3} />
                <Row rows={props.rows} handler={props.moveHandler} rowNumber={4} />
                <Row rows={props.rows} handler={props.moveHandler} rowNumber={5} />
                <Row rows={props.rows} handler={props.moveHandler} rowNumber={6} />
            </tbody>
        </table>
    );
}

export default Lake;