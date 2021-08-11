import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		width: '100%'
	},
	input: {
		width: 42
	}
});

let timeStamp;
let runTime;

export default function ProgressSlider(props) {
	const classes = useStyles();
	const { progress, setProgress, progressTimer, audio, duration, setUserChangingSongTime } = props;

	const handleSliderCommit = async (event, newValue) => {
		audio.currentTime = newValue / 100 * duration;
		setUserChangingSongTime(false);
	};

	const handleSliderChange = (event, newValue) => {
		setProgress(newValue);
		clearTimeout(progressTimer);
		setUserChangingSongTime(true);
	};

	timeStamp = `${Math.floor(progress / 100 * duration / 60)}:${(progress / 100 * duration) % 60 < 10
		? '0'
		: ''}${Math.round((progress / 100 * duration) % 60)}`;
	runTime = `${Math.floor(duration / 60)}:${Math.round(duration % 60)}`;
	if (timeStamp === 'NaN:NaN') {
		timeStamp = '0:00';
		runTime = '0:00';
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={2} alignItems="center">
				<Grid item>
					<Typography gutterBottom>{timeStamp}</Typography>
				</Grid>
				<Grid item xs>
					<Slider
						step={0.1}
						value={progress}
						onChange={handleSliderChange}
						onChangeCommitted={handleSliderCommit}
						aria-labelledby="input-slider"
					/>
				</Grid>
				<Grid item>
					<Typography gutterBottom>{runTime}</Typography>
				</Grid>
			</Grid>
		</div>
	);
}
