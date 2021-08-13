import { useContext } from 'react';
import MusicContext from '../Store/music-context';
import { initialMusic } from '../Store/music-context';
import SongCard from './SongCard';
import classes from './AllSongs.module.css'

export default function AllSongs() {
	const { currentPlaylist, playClickedPlaylistSong } = useContext(MusicContext);

	function onClickHandler(song) {
		playClickedPlaylistSong(song);
	}
	return (
        <div className={classes.allSongs}>
            <h1></h1>
			{currentPlaylist.map((song) => {
				return <SongCard onDoubleClick={() => onClickHandler(song)} key={song.title} song={song} />;
			})}
		</div>
	);
}
