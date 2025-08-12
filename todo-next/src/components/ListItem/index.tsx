
"use server"
import TrashIcon from "@/components/TrashIcon";
import {ListItemCheckbox} from "@/components/ListItem/ListItemCheckbox";


export async function ListItem(props: {onApagarClick: () => void, checked: boolean, onCheckBoxClick: (check:boolean) => void, text: string } ) {
    return (
        <div >
            <ListItemCheckbox checked={props.checked} onCheckBoxClick={props.onCheckBoxClick} />
            <ListItemText checked={props.checked} text={props.text} />
            <ListItemDeleteButton onApagarClick={props.onApagarClick} />
        </div>
    )
}

function ListItemDeleteButton(props: {onApagarClick: () => void}) {
    return (
        <button onClick={props.onApagarClick}>
            <TrashIcon />
        </button>
    )
}




function ListItemText(props: { text: string, checked: boolean } ) {
    return (
        <p >
            {props.text}
        </p>

    )
}