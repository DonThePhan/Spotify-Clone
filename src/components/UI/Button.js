import classes from './Button.module.css';

function Button(props) {
	return <div onKeyPress={props.onKeyPress} onClick={props.onClick} className={`${props.className} ${classes.button}`}>{props.children}</div>;
}

export default Button;
