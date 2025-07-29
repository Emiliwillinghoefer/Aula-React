import {createContext, type PropsWithChildren, useContext, useEffect, useReducer} from "react";
import type {ToDo} from "../Models/ToDo.ts"
import {v4 as uuid} from "uuid"


interface UseToDos {
    toDos: ToDo[];
    addToDo: (text: string) => void;
    updateToDo: (id: string, check: boolean) => void;
    validateInput: (text: string) => boolean;
    clearToDo: (id: string) => void;
}

interface Acao<T, C> {
    tipo: T;
    conteudo: C;
}

type ToDoAcao =
    | Acao<"Add", string>
    | Acao<"Set", ToDo[]>
    | Acao<"Update", {id: string, check: boolean}>
    | Acao<"Delete", string>;

const ToDosContext = createContext<UseToDos | undefined>(undefined);

function toDosReducer(state: ToDo[], action: ToDoAcao) : ToDo[] {
    switch (action.tipo) {
        case "Add":
            const toDo: ToDo = {
                id: uuid(),
                text: action.conteudo,
                checked: false,
            };
            return [...state, toDo];
        case "Set":
            return action.conteudo;
        case "Update":
            const {id, check} = action.conteudo;
            const index = state.findIndex(value => value.id === id);
            const newToDos = state.slice();
            newToDos[index].checked = check;
            return newToDos;
        case "Delete":
            const idD = action.conteudo;
            const idDelete = state.findIndex(value => value.id === idD);
            const deleteToDo = state.slice();
            deleteToDo.splice(idDelete, 1);
            return deleteToDo;
        default:
            throw new Error("Ação desconhecida");
    }
}

export function ToDosProvider(props: PropsWithChildren) {

    //const [toDos, dispatch] = useReducer(toDosReducer, []);

    const [toDos, dispatch] = useReducer(toDosReducer,
        undefined,
        () => {
            const storage = localStorage.getItem("todos")
            if (storage) return JSON.parse(storage);
            else return [];
        });

    useEffect(() => {
        const json = JSON.stringify(toDos);
        localStorage.setItem("todos", json);
    }, [toDos]);

    function addToDo(text: string) {
        dispatch({tipo: "Add", conteudo: text})
    }

    function validateInput(text: string) {
        if (text.length < 10) {
            return false;
        }
        return true;

    }

    function updateToDo(id: string, check: boolean) {
        dispatch({tipo: "Update", conteudo: {id, check}});
    }

    function clearToDo(id: string) {
        dispatch({tipo: "Delete", conteudo: id});
    }

    useEffect(() => {
        if (toDos.length == 0) return;
    }, [toDos]);

    return <ToDosContext value={
        {
            toDos,
            addToDo,
            updateToDo,
            validateInput,
            clearToDo
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
