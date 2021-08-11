import classes from './Player.module.css';
import Button from '../UI/Button';
import ProgressSlider from '../UI/ProgressSlider';
import { useEffect, useState, useContext, useCallback } from 'react';

import MusicContext from '../Store/music-context';

let progressTimer;

export default function Player(props) {
	const [ play, setPlay ] = useState(false);

	const { audio, prevSong, nextSong, songCount: { songIndex, songIndexTotal } } = useContext(MusicContext);
	const [ duration, setDuration ] = useState(audio.duration);
	const [ progress, setProgress ] = useState(0);
	const [ userChangingSongTime, setUserChangingSongTime ] = useState(false);
	const [ repeat, setRepeat ] = useState(false);
	const [ shuffle, setShuffle ] = useState(false);
	const [ shuffleSequence, setShuffleSequence ] = useState({});

	useEffect(
		() => {
			if (shuffle) {
				setShuffleSequence({ index: songIndex, shuffleList: [ songIndex ] });
			}
		},
		[ shuffle, setShuffleSequence ]
	);

	useEffect(
		() => {
			// execute when the data (in our case audio.duration) becomes available
			audio.addEventListener('loadeddata', () => {
				setDuration(audio.duration);
			});
		},
		[ audio, setDuration ]
	);

	// play button mechanism
	const togglePlay = useCallback(
		() => {
			setPlay((prevPlay) => {
				if (prevPlay) {
					audio.pause();
				} else {
					audio.play();
				}
				return !prevPlay;
			});
		},
		[ setPlay, audio ]
	);

	// while song is playing, update song 'progress' every 200 ms
	useEffect(
		() => {
			if (play && !userChangingSongTime) {
				progressTimer = setTimeout(() => {
					// this will cause rerender because the 'progress' hook is updated (w/ new value)
					setProgress(Math.round(audio.currentTime / duration * 100 * 10) / 10);
				}, 400);
			}
		},
		[ play, userChangingSongTime, setProgress, progress, audio, duration ]
	);

	// reset song when finished
	useEffect(
		() => {
			if (progress === 100) {
				audio.currentTime = 0;
				setProgress(0);
				togglePlay();

				if (repeat) {
					togglePlay();
				}
			}
		},
		[ progress, repeat, audio, togglePlay ]
	);

	function toggleRepeat() {
		setRepeat((prev) => !prev);
	}
	function toggleShuffle() {
		setShuffle((prev) => !prev);
	}

	function nextSongHandler() {
		audio.pause();
		setProgress(0);
		nextSong(shuffle);
	}
	function prevSongHandler() {
		if (audio.currentTime < 1) {
			// start from the beginning of current song
			setProgress(0);
			audio.currentTime = 0;
		} else {
			// go to previous song
			if (!shuffe) {
				audio.pause();
				setProgress(0);
				prevSong();
            } else {
                // prev shuffle history
			}
		}
	}

	// handle player when song changes
	useEffect(
		() => {
			if (play) {
				audio.play();
			}
		},
		[ audio, play ]
	);

	return (
		<div className={`${props.className} ${classes.player}`}>
			<div className={classes.player_buttons}>
				<Button onClick={toggleShuffle}>
					<i className={`fas fa-random ${shuffle && classes.selected}`} />
				</Button>
				<Button onClick={prevSongHandler}>
					<i className="fas fa-step-backward" />
				</Button>
				{play ? (
					<Button onClick={togglePlay}>
						<i className="fas fa-pause-circle fa-2x" />
					</Button>
				) : (
					<Button onClick={togglePlay}>
						<i className="fas fa-play-circle fa-2x" />
					</Button>
				)}
				<Button onClick={nextSongHandler}>
					<i className="fas fa-step-forward  " />
				</Button>
				<Button onClick={toggleRepeat}>
					<i className={`fas fa-redo-alt ${repeat && classes.selected}`} />
				</Button>
			</div>
			<ProgressSlider
				progress={progress}
				setProgress={setProgress}
				progressTimer={progressTimer}
				audio={audio}
				duration={duration}
				setUserChangingSongTime={setUserChangingSongTime}
			/>
		</div>
	);
}
