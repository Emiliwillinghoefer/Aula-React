import style from "../../../../Styles/listItem.module.css";
import {Trash} from "phosphor-react";
import {useListItems} from "../ListItemContext.tsx";

export function ListItemContent() {
    return (
        <div className={style.listItem}>
            <ListItemCheckbox/>
            <ListItemText />
            <ListItemDeleteButton/>
        </div>
    )
}

function ListItemDeleteButton() {
    const {onApagarClick} = useListItems();
    return (
        <button onClick={onApagarClick}>
            <Trash size={24}/>
        </button>
    )
}

function ListItemCheckbox() {

    const { checked, onCheckBoxClick} = useListItems();
    return (
        <input onChange={
            event => {
                onCheckBoxClick(event.target.checked)
            }

        } type={"checkbox"}  checked={checked}
        />
    )
}


function ListItemText() {
    const{checked, text} = useListItems();
    return (
        <p className={checked ? style.textoDecorado : "" }>
            {text}
        </p>

    )
}