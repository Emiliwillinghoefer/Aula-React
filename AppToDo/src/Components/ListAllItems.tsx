import {ListItem} from "./ListItem.tsx";
import type {ToDo} from "../Models/ToDo.ts";

interface ListAllItemsProps {
    listToDos: ToDo[];
    deleteItem: (id: string) => void;
    updateToDo: (id: string, check: boolean) => void;
}

export function ListAllItems(props:ListAllItemsProps) {
    return (
        <div>
            {
                props.listToDos.map(value  => {
                    return <ListItem {...value}
                                     key={value.id}
                                     onApagarClick={() => props.deleteItem(value.id)}
                                     onCheckBoxClick={(check)=> props.updateToDo(value.id, check)}
                    />
                })
            }

        </div>
    )
}