import { useContext } from 'react';
import MusicContext from '../Store/music-context';
import SongCard from './SongCard';
import classes from './AllSongs.module.css';
import Heading from './Heading';

export default function AllSongs() {
    const { currentPlaylist, playClickedPlaylistSong } = useContext(MusicContext);
    
    const albumsList = currentPlaylist.list.map((song) => {
        return song.albumArt;
    })

	function onClickHandler(song) {
		playClickedPlaylistSong(song);
	}
	return (
		<div className={classes.allSongs}>
			<Heading albumsArt={albumsList}>{currentPlaylist.title}</Heading>
			<div className={classes.songList}>
				{currentPlaylist.list.map((song) => {
					return <SongCard onDoubleClick={() => onClickHandler(song)} key={song.title} song={song} />;
				})}
			</div>
		</div>
	);
}
