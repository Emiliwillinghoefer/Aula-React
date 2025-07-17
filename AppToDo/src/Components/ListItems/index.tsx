import {ListItem} from "./LisItem";
import type {ToDo} from "../../Models/ToDo.ts";
import {SearchInput} from "./SearchInput.tsx";
import {useState} from "react";

interface ListAllItemsProps {
    listToDos: ToDo[];
    deleteItem: (id: string) => void;
    updateToDo: (id: string, check: boolean) => void;
}

export function ListAllItems(props:ListAllItemsProps) {

    const [busca, setBusca] = useState("");

    const filtro = props.listToDos.filter((v) => {
        return v.text.toLowerCase().includes(busca)
    })

    return (
        <div>
            <SearchInput
                valor={busca}
                setValor={setBusca}
            />
            {
                filtro.map(value  => {
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