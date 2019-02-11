import React from 'react'

const Legend = ({jump}) => {

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

			<h3>Actions</h3>
			<button type="button" id="jump" onClick={jump}>Jump</button>
			<button type="button" id="reproduce">Reproduce</button>
		</div>
    );

}

export default Legend;