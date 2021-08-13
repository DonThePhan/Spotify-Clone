import { useContext } from 'react';
import MusicContext from '../Store/music-context';
import SongCard from './SongCard';
import classes from './AllSongs.module.css'

export default function AllSongs() {
	const { currentPlaylist, playClickedPlaylistSong } = useContext(MusicContext);

	function onClickHandler(song) {
		playClickedPlaylistSong(song);
	}
	return (
        <div className={classes.allSongs}>
            <h1 className={classes.playlistTitle}>{ currentPlaylist.title}</h1>
			{currentPlaylist.list.map((song) => {
				return <SongCard onDoubleClick={() => onClickHandler(song)} key={song.title} song={song} />;
			})}
		</div>
	);
}
