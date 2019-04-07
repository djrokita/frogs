import React from 'react'

const Legend = ({jump, reproduce, action, msg}) => {

    return (
		<div className="legend">
			<h3>Legend</h3>
			<ul>
				<li>
					<span className="frog male"></span>
					<strong>Frog male</strong>
				</li>
				<li>
					<span className="frog female"></span>
					<strong>Frog female</strong>
				</li>
			</ul>
			<p className='legend-message'>{msg}</p>
			<h3>Actions</h3>
			<button type="button" id="jump" onClick={jump} disabled={action !== 'jump' ? true : false}>Jump</button>
			<button type="button" id="reproduce" onClick={reproduce} disabled={action !== 'reproduce' ? true : false}>Reproduce</button>
		</div>
    );
}

export default Legend;