import {useRef, useState} from "react";
import {useToDos} from "../store/useToDos.ts";
import {ListItem} from "../Components/ListItem.tsx";
import {Trash} from "phosphor-react";

export function Home() {
    const [newText, setNewText] = useState("");
    const {toDos, addToDo, clearAllToDos, clearToDo, updateToDo} = useToDos();

    const [deleteId, setDeleteId] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    function handleDeletePress(id: string) {
        setDeleteId(id);
        dialogRef.current?.showModal();
    }

    function clearNewText() {
        setNewText("");
    }

    const handleSubmit = ( event: React.FormEvent) => {
        event.preventDefault()
        if (newText == "") {
            return;
        }
        addToDo(newText)
        setNewText("");
    };

    return (
        <>
        <form onSubmit={handleSubmit}
              onReset={clearAllToDos}
        >
            <div className={"relative"}>
                <input className={"bg-gray-400 w-full"} value={newText} onChange={
                    event => {
                        setNewText(event.target.value)
                    }
                }/>
                <button className={"absolute  right-1 top-1"}
                        type={"button"}
                        onClick={clearNewText}
                ><Trash/></button>
            </div>
            <button className={"button"} type={"submit"}> Add ToDo</button>
            <button className={"button"} type={"reset"}>Limpar ToDos</button>
        </form>

        <div>
            {
                toDos.map(value  => {
                    return <ListItem {...value}
                                     key={value.id}
                                     onApagarClick={() => handleDeletePress(value.id)}
                                     onCheckBoxClick={(check)=> updateToDo(value.id, check)}
                    />
                })
            }

        </div>
            <dialog ref={dialogRef}>
                <button className={"button"} onClick={() => {
                    clearToDo(deleteId)
                    dialogRef.current?.close()
                }}>Sim</button>
                <button className={"button"}
                        onClick={() => dialogRef.current?.close()}
                >Não</button>
            </dialog>
        </>
    )
}