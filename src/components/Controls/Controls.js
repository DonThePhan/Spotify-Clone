import classes from './Controls.module.css';
import Player from './Player';
import VolumeSlider from '../UI/VolumeSlider';
import { useEffect } from 'react';

import { useContext } from 'react';
import MusicContext from '../Store/music-context';

function Controls(props) {
    const { currentSong, audio, volume, setVolume } = useContext(MusicContext);

    useEffect(() => {
        audio.volume = volume/100
    }, [volume, audio])

	return (
		<div className={`${props.className} ${classes.controls}`}>
			<div className={classes.controls_album}>
				<img src={currentSong.albumArt} alt="" />
				<div className={classes.song_info}>
					<h3>{currentSong.title}</h3>
					<p>{currentSong.artist}</p>
				</div>
			</div>
			<Player className={classes.controls_controls} />
			<div className={classes.controls_peripheral_controls}>
                <VolumeSlider volume={volume} setVolume={setVolume}/>
			</div>
		</div>
	);
}

export default Controls;
