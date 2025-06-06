import type {ToDo} from "../Models/ToDo.ts";

interface ListItemProps extends ToDo {
    onApagarClick: () => void;
    onCheckBoxClick: (check:boolean) => void;
}

export function ListItem(props: ListItemProps) {
    return (
        <div>
            <input onChange={
                event => {
                    props.onCheckBoxClick(event.target.checked)
                }
            } type={"checkbox"}/>
            <p>{props.text}</p>
            <button onClick={props.onApagarClick}>Apagar</button>
        </div>
    )
}