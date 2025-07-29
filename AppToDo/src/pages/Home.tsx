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
            <h1 className="text-[#efd1b9] text-5xl pb-5">App ToDo</h1>
                <p className="text-[#4A5565]">Mantenha-se organizado e faça as coisas</p>
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

    // continuar estilizando
}