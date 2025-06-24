import {useRef, useState} from "react";
import {useToDos} from "../store/useToDos.tsx";
import {DeleteDialog} from "../Components/DeleteDialog.tsx";
import {NewToDoForm} from "../Components/NewToDoForm.tsx";
import {ListAllItems} from "../Components/ListAllItems.tsx";

export function Home() {
    const {toDos, clearToDo, updateToDo} = useToDos();

    const [deleteId, setDeleteId] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);


    function handleDeletePress(id: string) {
        setDeleteId(id);
        dialogRef.current?.showModal();
    }

    return (
        <>
            <NewToDoForm/>

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