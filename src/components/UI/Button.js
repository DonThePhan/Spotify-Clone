import classes from './Button.module.css';

function Button(props) {
	return <button onDoubleClick={props.onDoubleClick} onKeyPress={props.onKeyPress} onClick={props.onClick} className={`${props.className} ${classes.button}`}>{props.children}</button>;
}

export default Button;
