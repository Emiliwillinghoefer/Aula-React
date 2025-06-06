import {useState} from "react";
import {useToDos} from "../store/useToDos.ts";

export function Home() {
    const [newText, setNewText] = useState("");
    const {toDos, addToDo, clearToDo} = useToDos();

    return (

        <form onSubmit={
            event => {
                event.preventDefault()
                if (newText == "") {
                    return;
                }
                addToDo(newText)
                setNewText("");
            }
        }
              onReset={() => {
                  clearToDo();
              }}
        >
            <input value={newText} onChange={
                event => {
                    setNewText(event.target.value)
                }
            }/>

            <button type={"submit"}> Add ToDo</button>
            <button type={"reset"}>Limpar ToDos</button>
        </form>

    )
}