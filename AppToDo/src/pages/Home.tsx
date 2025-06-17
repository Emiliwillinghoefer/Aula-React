import {useRef, useState} from "react";
import {useToDos} from "../store/useToDos.ts";
import {DeleteDialog} from "../Components/DeleteDialog.tsx";
import {AddNewToDo} from "../Components/AddNewToDo.tsx";
import {ListAllItems} from "../Components/ListAllItems.tsx";

export function Home() {
    const {toDos, addToDo, clearAllToDos, clearToDo, updateToDo, validateInput} = useToDos();

    const textInput = useRef<HTMLInputElement>(null);

    const [deleteId, setDeleteId] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [inputInvalido, setInputInvalido] = useState("");

    function handleDeletePress(id: string) {
        setDeleteId(id);
        dialogRef.current?.showModal();
    }

    function clearNewText() {
        if (textInput.current != null) {
            textInput.current.value = "";
        }

    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const newText = textInput.current?.value ?? "";
        if (!validateInput(newText)) {
            setInputInvalido("Digite pelo menos 10 caracteres.");
            return;
        }
        addToDo(newText)
        clearNewText();
        setInputInvalido("");
    };

    return (
        <>
        <form onSubmit={handleSubmit}
              onReset={clearAllToDos}
        >
            <AddNewToDo
                ref={textInput}
                inputInvalido={inputInvalido}
                setInputInvalido={setInputInvalido}
                clearNewText={ clearNewText }
            />

            <button className={"button"} type={"submit"}> Add ToDo</button>
            <button className={"button"} type={"reset"}>Limpar ToDos</button>
        </form>

        <ListAllItems
            listToDos={toDos}
            deleteItem={handleDeletePress}
            updateToDo={updateToDo}
        />
        <DeleteDialog
            ref={dialogRef}
            simClick={() => {
                clearToDo(deleteId)
                dialogRef.current?.close()
            }}
            naoClick={() => dialogRef.current?.close()}
        />
        </>
    )
}