import {useRef, useState} from "react";
import {useToDos} from "../store/useToDos.tsx";
import {DeleteDialog} from "../Components/DeleteDialog.tsx";
import {NewToDoForm} from "../Components/NewToDoForm.tsx";
import {ListAllItems} from "../Components/ListItems";

export function Home() {
    const {toDos, updateToDo, clearToDo} = useToDos();

    const [deleteId, setDeleteId] = useState("");
    const dialogRef = useRef<HTMLDialogElement>(null);


    function handleDeletePress(id: string) {
        setDeleteId(id);
        dialogRef.current?.showModal();
    }

    return (

            <div className="w-[60%] mx-auto items-center">
            <h1 className="text-[#efd1b9] text-6xl">App ToDo</h1>
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
        </div>
    )

    //Todo
    // continuar estilizando
    // local storage
    // parametros pela Url, botões de filtragem por estado
    // bucar todos local com o .then
    //dialog
}