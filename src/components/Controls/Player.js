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
	const [ shufSeq, setShufSeq ] = useState({ curShufIndex: 0, shuffleList: [] });

	function downHandler({ key }) {
		console.log(shuffle);
		if (key === ' ') {
			togglePlay();
		} else if (key === 'ArrowRight') {
			nextSongHandler();
		} else if (key === 'ArrowLeft') {
			prevSongHandler();
		}
	}

	// Add event listeners
	useEffect(
		() => {
			window.addEventListener('keydown', downHandler);

			// Remove event listeners on cleanup
			return () => {
				window.removeEventListener('keydown', downHandler);
			};
		},
		[ downHandler ]
	);

	useEffect(
		() => {
			setShufSeq({ curShufIndex: 0, shuffleList: [ songIndex ] });
		},
		[ shuffle, setShufSeq ]
	);

	useEffect(
		() => {
			console.log(shufSeq);
		},
		[ shufSeq ]
	);

	function shuffleIfRequired(shuffle, direction, shuffleIndex = null) {
		let indexReturnValue;

		if (shuffle) {
			if (direction === 'prev') {
				if (shufSeq.curShufIndex === 0) {
					indexReturnValue = 0;
				} else {
					indexReturnValue = shufSeq.curShufIndex - 1;
				}
				setShufSeq((prev) => {
					if (prev.curShufIndex === 0) {
						return prev;
					} else {
						return { ...prev, curShufIndex: prev.curShufIndex - 1 };
					}
				});
				return shufSeq.shuffleList[indexReturnValue];
			} else if (direction === 'next') {
				if (shufSeq.curShufIndex === shufSeq.shuffleList.length - 1) {
					indexReturnValue = shuffleIndex;
				} else {
					indexReturnValue = shufSeq.shuffleList[shufSeq.curShufIndex + 1];
				}

				setShufSeq((prev) => {
					if (prev.curShufIndex === prev.shuffleList.length - 1) {
						// if at end of shuffle list, add
						return {
							curShufIndex: prev.curShufIndex + 1,
							shuffleList: [ ...prev.shuffleList, shuffleIndex ]
						};
					} else {
						// if not the last song in list, just move index forward
						return { ...prev, curShufIndex: prev.curShufIndex + 1 };
					}
				});
				return indexReturnValue;
			}
		} else {
			setShufSeq({ curShufIndex: 0, shuffleList: [] });
		}
	}

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
	function togglePlay() {
		setPlay((prevPlay) => !prevPlay);
	}
	// handle player when song changes or play is toggled
	useEffect(
		() => {
			if (play) {
				audio.play();
			} else {
				audio.pause();
			}
		},
		[ audio.src, play ]
	);

	// while song is playing, update song 'progress' every 200 ms
	useEffect(
		() => {
			if (play && !userChangingSongTime && audio.currentTime !== audio.duration) {
				console.log('progressing');
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
			if (audio.currentTime === duration && !userChangingSongTime) {
				audio.currentTime = 0;
				if (repeat) {
					setProgress(0);
					audio.play();
				} else {
					nextSongHandler();
				}
			}
		},
		[ audio.currentTime, duration, userChangingSongTime, repeat, togglePlay ]
	);

	function toggleRepeat() {
		setRepeat((prev) => !prev);
	}
	function toggleShuffle() {
		setShuffle((prev) => !prev);
	}

	function nextSongHandler() {
		nextSong(shuffle, shuffleIfRequired);
	}
	function prevSongHandler() {
		if (audio.currentTime > 1) {
			audio.currentTime = 0; // start from the beginning of CURRENT song
		} else {
			prevSong(shuffle, shuffleIfRequired); // go to PREVIOUS song
		}
	}

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
