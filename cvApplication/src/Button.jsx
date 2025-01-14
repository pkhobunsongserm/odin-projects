function ButtonFactory(props) {
    return(<button className={props.className} onClick={props.clickEvent}>{props.text}</button>)
}

export default ButtonFactory