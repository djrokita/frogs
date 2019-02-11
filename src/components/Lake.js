import React from 'react'
import Row from './Row';

const Lake = (props) => {

    return (
        <table id="lake">
            <thead>
                <tr>
                    <th colSpan="10">Lake</th>
                </tr>
            </thead>
            <tbody>
                <Row rows={props.rows} handler={props.moveHandler} />
                <Row rows={props.rows} handler={props.moveHandler} />
                <Row rows={props.rows} handler={props.moveHandler} />
                <Row rows={props.rows} handler={props.moveHandler} />
                <Row rows={props.rows} handler={props.moveHandler} />
                <Row rows={props.rows} handler={props.moveHandler} />
            </tbody>
        </table>
    );
}

export default Lake;