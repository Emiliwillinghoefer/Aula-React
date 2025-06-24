import type {ToDo} from "../Models/ToDo.ts";
import {Trash} from "phosphor-react";
import style from "../Styles/listItem.module.css";
import type {PropsWithChildren} from "react";

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
            <Text checked={props.checked}>
                {props.text}
            </Text>
            <button onClick={props.onApagarClick}>
                <Trash size={24}/>
            </button>
        </div>
    )
}


function Text(prop: PropsWithChildren<{checked:boolean}>) {
    return (
        <p className={ prop.checked ? style.textoDecorado : "" }>
            {prop.children}
        </p>

    )
}
