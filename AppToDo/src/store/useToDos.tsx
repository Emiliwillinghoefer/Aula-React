import {createContext, type PropsWithChildren, useContext, useEffect, useState} from "react";
import type {ToDo} from "../Models/ToDo.ts"
import {v4 as uuid} from "uuid"


interface UseToDos {
    toDos: ToDo[];
    setToDos: (todos: ToDo[]) => void;
    addToDo: (text: string) => void;
    updateToDo: (id: string, check: boolean) => void;
    validateInput: (text: string) => boolean;
}

const ToDosContext = createContext<UseToDos | undefined>(undefined);

export function ToDosProvider(props: PropsWithChildren) {

    const [toDos, setToDos] = useState<ToDo[]>([]);

    function addToDo(text: string) {
        const toDo: ToDo = {id: uuid(), text, checked: false};
        setToDos([...toDos, toDo]);
    }


    function validateInput(text: string) {
        if (text.length < 10) {
            return false;
        }
        return true;

    }


    function updateToDo(id: string, check: boolean) {
        const index = toDos.findIndex(value => value.id === id);
        const newToDos = toDos.slice(); //Faz copia do objeto
        newToDos[index].checked = check;
        setToDos(newToDos);
    }

    useEffect(() => {
        if (toDos.length == 0) return;
    }, [toDos]);

    return <ToDosContext value={
        {
            toDos,
            setToDos,
            addToDo,
            updateToDo,
            validateInput
        }
    }>{props.children}</ToDosContext>

}

export function useToDos() {
    const context = useContext(ToDosContext);
    if (!context) {
        throw new Error("useToDos deve ser usado dentro de um ToDosProvider");
    }
    return context;
}