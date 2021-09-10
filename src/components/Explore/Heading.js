import classes from './Heading.module.css';
export default function Heading(props) {
	return (
		<div className={classes.heading}>
			<div className={classes.albumsArt}>
				<div className={classes.imgDiv}>
					<div className={classes.imgContainer}>
						{props.albumsArt && props.albumsArt[0] ? (
							<img className={classes.img} src={props.albumsArt[0]} alt="" />
						) : null}
					</div>
					<div className={classes.imgContainer}>
						{props.albumsArt && props.albumsArt[1] ? (
							<img className={classes.img} src={props.albumsArt[1]} alt="" />
						) : null}
					</div>
				</div>
				<div className={classes.imgDiv}>
					<div className={classes.imgContainer}>
						{props.albumsArt && props.albumsArt[2] ? (
							<img className={classes.img} src={props.albumsArt[2]} alt="" />
						) : null}
					</div>
					<div className={classes.imgContainer}>
						{props.albumsArt && props.albumsArt[3] ? (
							<img className={classes.img} src={props.albumsArt[3]} alt="" />
						) : null}
					</div>
				</div>
			</div>
			<h1 className={classes.title}>{props.children}</h1>
		</div>
	);
}
