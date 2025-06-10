import {useEffect, useState} from "react";
import  type {ToDo} from "../Models/ToDo.ts"
import {v4 as uuid} from "uuid"

export function useToDos() {

    const [toDos, setToDos] = useState<ToDo[]>([]);

    function addToDo(text:string) {
        const toDo:ToDo = {id: uuid(), text, checked: false};
        setToDos([... toDos, toDo]);
    }

    function clearAllToDos() {
        setToDos([]);
    }

    function clearToDo(id:string) {
        const index = toDos.findIndex(value => value.id === id);
        const newToDos = toDos.slice();
        newToDos.splice(index, 1);
        setToDos(newToDos);
    }

    function updateToDo(id:string, check:boolean) {
        const index = toDos.findIndex(value => value.id === id);
        const newToDos = toDos.slice(); //Faz copia do objeto
        newToDos[index].checked = check;
        setToDos(newToDos);
    }

    useEffect(() => {
        if (toDos.length == 0) return;
        console.log(toDos)
    }, [toDos]);

    return {
        toDos,
        addToDo, clearAllToDos, clearToDo,
        updateToDo
    }

    //ToDO Validacao input obrigatorio em JSX tendo no min 10caracteres
    //ToDo No input usar o useRef.

}