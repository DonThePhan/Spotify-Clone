import Lists from '../components/Lists/Lists';
import Explore from '../components/Explore/Explore';
import Controls from '../components/Controls/Controls';
import classes from './Main.module.css';

function PlayerPage() {
	return (
		<div className="page">
			<div className={classes.body}>
				<Lists className={classes.lists}/>
				<Explore className={classes.explore}/>
			</div>
			<Controls className={classes.controls} />
		</div>
	);
}

export default PlayerPage;
