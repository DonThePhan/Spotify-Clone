import classes from './Explore.module.css';
import AllSongs from './AllSongs';

function Explore(props) {
	return (
		<div className={`${props.className}`}>
			<AllSongs />
		</div>
	);
}

export default Explore;
