import classes from './Button.module.css';

function Button(props) {
	return <div onClick={props.onClick} className={`${props.className} ${classes.button}`}>{props.children}</div>;
}

export default Button;
