import {useRef, useState} from "react";
import {useToDos} from "../store/useToDos.ts";
import {ListItem} from "../Components/ListItem.tsx";
import {Trash} from "phosphor-react";
import {DeleteDialog} from "../Components/DeleteDialog.tsx";

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
            <div className="relative">
                <input ref={textInput}
                    className={`bg-gray-400 w-full px-2 py-1 rounded 
                        ${inputInvalido ? 'border border-red-500' : ''}`}

                    onChange={() => setInputInvalido("")}
                />
                <button className="absolute right-1 top-1"
                    type="button"
                    onClick={clearNewText}
                ><Trash/></button>

                {inputInvalido && (
                    <p className="text-red-500 text-sm mt-1">{inputInvalido}</p>
                )}
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