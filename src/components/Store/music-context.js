import React, { useState, useEffect } from 'react';

// const initialMusic = {
// 	title: 'Kissing Other People',
// 	album: 'Three. Two. One',
// 	albumArt: `/images/Lennon_Stella_-_Three_Two_One.png`,
// 	location: `/music/Lennon Stella - Kissing Other People.mp3`
// };

const initialMusic = [
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

const MusicContext = React.createContext({
	songCount: {},
	currentSong: {},
	volume: 100,
	audio: undefined,
	nextSong: () => {},
	prevSong: () => {}
});

export const MusicContextProvider = (props) => {
	const [ volume, setVolume ] = useState(100);

	const [ playlist, setPlaylist ] = useState(initialMusic);
	const [ songCount, setSongCount ] = useState({ songIndex: 0, songIndexTotal: playlist.length });
	const [ currentSong, setCurrentSong ] = useState(playlist[songCount.songIndex]);
	const [ audio, setAudio ] = useState(new Audio(currentSong.location));

	function nextSong(shuffle) {
		if (shuffle) {
			setSongCount((prev) => {
				return { ...prev, songIndex: Math.floor(Math.random() * prev.songIndexTotal) % prev.songIndexTotal };
			});
		} else {
			setSongCount((prev) => {
				return { ...prev, songIndex: (prev.songIndex + 1) % prev.songIndexTotal };
			});
		}
	}
	function prevSong() {
		setSongCount((prev) => {
			return { ...prev, songIndex: (prev.songIndex + prev.songIndexTotal + -1) % prev.songIndexTotal };
		});
	}

	//chain effects after nextSong/prevSong
	useEffect(
		() => {
			setCurrentSong(playlist[songCount.songIndex]);
		},
		[ setCurrentSong, playlist, songCount.songIndex ]
	);
	useEffect(
		() => {
			setAudio(new Audio(currentSong.location));
		},
		[ currentSong.location, setAudio ]
	);

	const value = {
		songCount,
		currentSong,
		volume,
		audio,
		prevSong,
		nextSong
	};

	return <MusicContext.Provider value={value}>{props.children}</MusicContext.Provider>;
};

export default MusicContext;
