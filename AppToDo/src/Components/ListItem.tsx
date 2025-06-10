import type {ToDo} from "../Models/ToDo.ts";
import {Trash} from "phosphor-react";
import style from "../Styles/listItem.module.css";

interface ListItemProps extends ToDo {
    onApagarClick: () => void;
    onCheckBoxClick: (check:boolean) => void;
}

export function ListItem(props: ListItemProps) {
    return (
        <div className={style.listItem}>
            <input onChange={
                event => {
                    props.onCheckBoxClick(event.target.checked)
                }
            } type={"checkbox"} />
            <p className={ props.checked ? style.textoDecorado : "" }>{props.text}</p>
            <button onClick={props.onApagarClick}>
                <Trash size={24}/>
            </button>
        </div>
    )
}