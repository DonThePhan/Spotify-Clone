import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
	root: {
		width: 150
	},
	input: {
		width: 42
	}
});

export default function VolumeSlider(props) {
	const classes = useStyles();
    const { volume, setVolume } = props

	const handleSliderChange = (event, newValue) => {
		setVolume(newValue);
	};

	return (
		<div className={classes.root}>
	
			<Grid container spacing={2} alignItems="center">
				<Grid item>
					<VolumeUp />
				</Grid>
				<Grid item xs>
					<Slider
						value={volume}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
					/>
				</Grid>
			</Grid>
		</div>
	);
}
