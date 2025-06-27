import type {ToDo} from "../Models/ToDo.ts";
import {Trash} from "phosphor-react";
import style from "../Styles/listItem.module.css";
import {createContext, type PropsWithChildren, useContext} from "react";

interface ListItemProps extends ToDo {
    onApagarClick: () => void;
    onCheckBoxClick: (check:boolean) => void;
}

interface ListItemPropsContext extends ListItemProps {}

const ListItemContext = createContext<ListItemPropsContext | undefined>( undefined );

function useListItems() {
    const context =  useContext(ListItemContext);
    if (!context) {
        throw new Error("Nenhum provider de ListItem");
    }
    return context;
}

function ListItemProvider(props: PropsWithChildren<{ value: ListItemProps }>) {
    return <ListItemContext value={props.value}>
        {props.children}
    </ListItemContext>
}

export function ListItem(props: ListItemProps) {
    return (
        <ListItemProvider value={props}>
        <ListItemContent/>
        </ListItemProvider>

    )
}


function ListItemContent() {
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

    const {onCheckBoxClick} = useListItems();
    return (
        <input onChange={
            event => {
                onCheckBoxClick(event.target.checked)
            }
        } type={"checkbox"} />
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
