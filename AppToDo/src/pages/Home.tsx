import {useState} from "react";
import {useToDos} from "../store/useToDos.ts";
import {ListItem} from "../Components/ListItem.tsx";

export function Home() {
    const [newText, setNewText] = useState("");
    const {toDos, addToDo, clearAllToDos, clearToDo, updateToDo} = useToDos();

    return (
        <>
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
                  clearAllToDos();
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

        <div>
            {
                toDos.map(value  => {
                    return <ListItem {...value}
                                     key={value.id}
                                     onApagarClick={() => clearToDo(value.id)}
                                     onCheckBoxClick={(check)=> updateToDo(value.id, check)}
                    />
                })
            }

        </div>
        </>
    )
}