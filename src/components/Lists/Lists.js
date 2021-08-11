import classes from './Lists.module.css';

function Lists(props) {
	return (
		<div className={`${props.className} ${classes.lists}`}>
            <div>
                <h3>Playlists</h3>
				<ul>
					<li>Pump My Up</li>
					<li>High Energy</li>
					<li>Nap Time</li>
				</ul>
			</div>
		</div>
	);
}

export default Lists;
