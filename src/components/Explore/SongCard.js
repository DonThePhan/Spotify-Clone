import { useContext, useState } from 'react';
import MusicContext from '../Store/music-context';
import classes from './SongCard.module.css';

export default function SongCard(props) {
	const { currentSong: { title: curTitle }, playlists, addToPlaylist } = useContext(MusicContext);
	const { title, artist, album, albumArt, location } = props.song;
	const [ addToPlaylistPopUp, setAddToPlaylistPopUp ] = useState(false);

	function addToPlaylistButtonClickHandler() {
		setAddToPlaylistPopUp((prev) => !prev);
	}

	function addToPlaylistHandler(playlistTitle, title) {
		addToPlaylist(playlistTitle, title);
		setAddToPlaylistPopUp((prev) => !prev);
	}

	return (
		<div className={classes.songCard}>
			<img className={classes.img} src={albumArt} alt="" />
			<div className={classes.titleAndArtist}>
				<p className={curTitle === title ? classes.playing : null}>{title}</p>
				<p>{artist}</p>
			</div>
			<p className={classes.album}>{album}</p>
			{!addToPlaylistPopUp && <button onClick={addToPlaylistButtonClickHandler}>Add to Playist</button>}
			{addToPlaylistPopUp && (
				<div className={classes.addPopUp}>
					{playlists.map((playlist) => (
						<p key={playlist.title} onClick={() => addToPlaylistHandler(playlist.title, title)}>
							{playlist.title}
						</p>
					))}
				</div>
			)}
		</div>
	);
}
