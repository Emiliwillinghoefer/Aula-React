import {useState} from "react";
import {useToDos} from "../store/useToDos.ts";

export function Home() {
    const [newText, setNewText] = useState("");
    const {toDos, addToDo} = useToDos();

    return (

        <form onSubmit={event => {
            event.preventDefault()
            if (newText == "") {
                return;
            }
            addToDo(newText)
            setNewText("");
        }
        }>
            <input value={newText} onChange={
                event => {
                    setNewText(event.target.value)
                }
            }/>

            <button type={"submit"}> Add ToDo</button>
        </form>

        //TODO: Inserir um clear todo na tela para limpar todos os todos.
    )
}