import {createContext, type PropsWithChildren, useContext} from "react";
import {useToDos} from "./useToDos.tsx";

interface clearToDosProps {
    clearAllToDos: () => void;
    clearToDo: (id: string) => void;
}

const ClearToDoContext = createContext<clearToDosProps | undefined>(undefined);

export function ClearToDoProvider(props: PropsWithChildren) {

    const{setToDos, toDos} = useToDos();

    function clearAllToDos() {
        setToDos([]);
    }

    function clearToDo(id: string) {
        const index = toDos.findIndex(value => value.id === id);
        const newToDos = toDos.slice();
        newToDos.splice(index, 1);
        setToDos(newToDos);
    }

    return <ClearToDoContext value={
        {
            clearToDo, clearAllToDos
        }
    }>{props.children}</ClearToDoContext>
}

export function clearToDos() {
    const contexto = useContext(ClearToDoContext);
    if (!contexto) {
        throw new Error("Nenhum provider de ClearTodo");
    }
    return contexto;
}