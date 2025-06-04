import {useEffect, useState} from "react";
import  type {ToDo} from "../Models/toDo"
import {v4 as uuid} from "uuid"

export function useToDos() {

    const [toDos, setToDos] = useState<ToDo[]>([]);

    function addToDo(text:string) {
        const toDo:ToDo = {id: uuid(), text, checked: false};
        setToDos([... toDos, toDo]);
    }

    useEffect(() => {
        if (toDos.length == 0) return;
        console.log(toDos)
    }, [toDos]);

    return {
        toDos,
        addToDo
    }


}