import classes from './Lists.module.css';
import MusicContext from '../Store/music-context';
import { useContext } from 'react';
import Button from '../UI/Button';

function Lists(props) {
	const { playlists, changePlaylist, currentPlaylist } = useContext(MusicContext);
	return (
		<div className={`${props.className} ${classes.lists}`}>
			<div>
				<h3>Playlists</h3>
				<div className={classes.playlists}>
					{playlists.map((playlist) => (
						<Button
							key={playlist.title}
							className={playlist.title === currentPlaylist.title ? classes.selected : null}
							onDoubleClick={() => changePlaylist(playlist.title)}
						>
							{playlist.title}
						</Button>
					))}
				</div>
			</div>
		</div>
	);
}

export default Lists;
