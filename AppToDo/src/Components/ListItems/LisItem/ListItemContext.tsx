import {createContext, type PropsWithChildren, useContext} from "react";
import type {ListItemProps} from "./ListItemProps";


interface ListItemPropsContext extends ListItemProps {}

const ListItemContext = createContext<ListItemPropsContext | undefined>( undefined );

export function useListItems() {
    const context =  useContext(ListItemContext);
    if (!context) {
        throw new Error("Nenhum provider de ListItem");
    }
    return context;
}

export function ListItemProvider(props: PropsWithChildren<{ value: ListItemProps }>) {
    return <ListItemContext value={props.value}>
        {props.children}
    </ListItemContext>
}