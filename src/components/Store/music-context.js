import React, { useState, useEffect } from 'react';

export const initialMusic = [
	{
		title: 'Kissing Other People',
		artist: 'Lennon Stella',
		album: 'Three. Two. One',
		albumArt: `/images/Lennon_Stella_-_Three_Two_One.png`,
		location: `/music/Lennon Stella - Kissing Other People.mp3`
	},
	{
		title: 'Sugar',
		artist: 'Robin Schulz',
		album: '',
		albumArt: `/images/Robin_schulz_sugar_cover.jpeg`,
		location: `/music/Robin Schulz - Sugar (feat. Francesco Yates).mp3`
	},
	{
		title: 'The Nights',
		artist: 'Avicii',
		album: '',
		albumArt: `/images/Avicii_Nights_Artwork.png`,
		location: `/music/Avicii - The Nights.mp3`
	},
	{
		title: 'Best Part',
		artist: 'Daniel Caesar (feat. H.E.R.)',
		album: 'Freudian',
		albumArt: `/images/Freudian_by_Daniel_Caesar.jpg`,
		location: `/music/Daniel Caesar - Best Part (feat. H.E.R.).mp3`
	},
	{
		title: 'Best Of You',
		artist: 'Foo Fighters',
		album: 'In Your Honor',
		albumArt: `/images/Foo_fighters_best_of_you.png`,
		location: `/music/Foo Fighters - Best Of You.mp3`
	},
	{
		title: 'Lights',
		artist: 'Clyde Evans',
		album: '',
		albumArt: `/images/lights.jpg`,
		location: `/music/Lights.mp3`
	},
	{
		title: 'Una Mattina',
		artist: 'Ludovico Einaud',
		album: 'Una mattina',
		albumArt: `/images/Einaudi_UnaMattina.jpg`,
		location: `/music/Ludovico Einaudi - Una Mattina.mp3`
	},
	{
		title: 'Girls Like You',
		artist: 'Maroon 5 ft. Cardi B',
		album: 'Red Pill Blues',
		albumArt: `/images/Girls_like_You_cover.png`,
		location: `/music/Maroon 5 - Girls Like You ft. Cardi B.mp3`
	},
	{
		title: 'Sunflower',
		artist: 'Post Malone, Swae Lee',
		album: `Hollywood's Bleeding`,
		albumArt: `/images/Into_the_Spider-Verse_Cover.jpg`,
		location: `/music/Post Malone, Swae Lee - Sunflower.mp3`
	},
	{
		title: 'RISE',
		artist: 'The Glitch Mob, Mako, and The Word Alive',
		album: '',
		albumArt: `/images/rise.jpg`,
		location: `/music/RISE.mp3`
	},
	{
		title: 'Pump Up The Jam',
		artist: 'Technotronic',
		album: 'Pump Up the Jam: The Album',
		albumArt: `/images/Pump_Up_the_Jam.png`,
		location: `/music/Technotronic - Pump Up The Jam.mp3`
	}
];

const initialPlaylists = [
	{
		title: 'High Energy',
		list: initialMusic.filter((song, index) => [ 2, 4, 9, 10 ].includes(index))
	},
	{
		title: 'Relaxing',
		list: initialMusic.filter((song, index) => [ 3, 6, 7, 8 ].includes(index))
	}
];

const MusicContext = React.createContext({
	play: false,
	setPlay: () => {},
	songCount: {},
	currentSong: {},
	volume: 100,
	setVolume: () => {},
	audio: undefined,
	nextSong: () => {},
	prevSong: () => {},
	currentPlaylist: [],
	changePlaylist: () => {},
	playlists: [],
	addToPlaylist: () => {},
	playClickedPlaylistSong: () => {}
});

// must always refer to same object (or will up having multiple songs playing at once when changing songs), therefore no useState since changing song require new object
const audio = new Audio();

export const MusicContextProvider = (props) => {
	const [ play, setPlay ] = useState(false);
	const [ volume, setVolume ] = useState(100);
	const [ playlists, setPlaylists ] = useState([ { title: 'All Songs', list: initialMusic }, ...initialPlaylists ]);
	const [ currentPlaylist, setCurrentPlaylist ] = useState(playlists[0]);
	const [ songCount, setSongCount ] = useState({ songIndex: 0, songIndexTotal: currentPlaylist.list.length });
	const [ currentSong, setCurrentSong ] = useState(currentPlaylist.list[songCount.songIndex]);

	function nextSong(shuffle, shuffleIfRequired) {
		if (shuffle) {
			let newSongIndex = Math.floor(Math.random() * songCount.songIndexTotal);
			newSongIndex = shuffleIfRequired(shuffle, 'next', newSongIndex);
			setSongCount((prev) => {
				return { ...prev, songIndex: newSongIndex };
			});
		} else {
			setSongCount((prev) => {
				return { ...prev, songIndex: (prev.songIndex + 1) % prev.songIndexTotal };
			});
		}
	}
	function prevSong(shuffle, shuffleIfRequired) {
		setSongCount((prev) => {
			if (shuffle) {
				let newSongIndex = shuffleIfRequired(shuffle, 'prev');
				return { ...prev, songIndex: newSongIndex };
			} else {
				return { ...prev, songIndex: (prev.songIndex + prev.songIndexTotal + -1) % prev.songIndexTotal };
			}
		});
	}

	//chain effects after nextSong/prevSong
	useEffect(
		() => {
			setCurrentSong(currentPlaylist.list[songCount.songIndex]);
		},
		[ setCurrentSong, currentPlaylist.list, songCount.songIndex ]
	);
	useEffect(
		() => {
			audio.setAttribute('src', currentSong.location);
		},
		[ currentSong.location ]
	);

	function addToPlaylist(playlistTitle, title) {
		const song = initialMusic.find((song) => song.title === title);
		setPlaylists((prevPlaylists) => {
			const newPlaylists = prevPlaylists.map((playlist) => {
				if (playlist.title === playlistTitle) {
					return {
						title: playlist.title,
						list: [ ...playlist.list, song ]
					};
				}
				return playlist;
			});
			return newPlaylists;
		});
	}

	function playClickedPlaylistSong(selectedSong) {
		setPlay(true);
		setSongCount((prev) => {
			let newIndex;

			for (let i = 0; i < currentPlaylist.list.length; i++) {
				if (currentPlaylist.list[i].title === selectedSong.title) {
					newIndex = i;
				}
			}

			return {
				...prev,
				songIndex: newIndex
			};
		});
	}

	function changePlaylist(title) {
		setPlay(true);
		const newPlaylist = playlists.find((playlist) => playlist.title === title);
		setCurrentPlaylist(newPlaylist);
		setSongCount({ songIndex: 0, songIndexTotal: newPlaylist.list.length });
	}

	const value = {
		play,
		setPlay,
		songCount,
		currentSong,
		volume,
		setVolume,
		audio,
		prevSong,
		nextSong,
		currentPlaylist,
		changePlaylist,
		playlists,
		addToPlaylist,
		playClickedPlaylistSong
	};

	return <MusicContext.Provider value={value}>{props.children}</MusicContext.Provider>;
};

export default MusicContext;
