
import {ListItem} from "@/components/ListItem";
import {ToDo} from "@/models/ToDo";

interface ListAllItemsProps {
    listToDos: ToDo[];
    deleteItem: (id: string) => void;
    updateToDo: (id: string, check: boolean) => void;
}

export async function ListAllItems(props:ListAllItemsProps) {
    console.log("props", props.listToDos);

    return (
        <div>
            {props.listToDos.map(value => (
                <ListItem
                    {...value}
                    key={value.id}
                    onApagarClick={async () => {
                        "use server"
                        await props.deleteItem(value.id)
                    }}
                    onCheckBoxClick={async (check) => {
                        "use server"
                        await props.updateToDo(value.id, check)
                    }}
                />
            ))}


        </div>
    )
}

