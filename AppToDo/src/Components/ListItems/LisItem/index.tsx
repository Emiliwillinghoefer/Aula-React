import type {ListItemProps} from "./ListItemProps.ts";
import {ListItemProvider} from "./ListItemContext.tsx";
import {ListItemContent} from "./ListItemContent";


export function ListItem(props: ListItemProps) {
    return (
        <ListItemProvider value={props}>
        <ListItemContent/>
        </ListItemProvider>

    )
}



