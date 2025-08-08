import {type RefObject} from "react";

interface DeleteDialogProps {
    ref: RefObject<HTMLDialogElement | null> ;
    simClick: () => void;
    naoClick: () => void;
}

export function DeleteDialog(props: DeleteDialogProps) {
    return (
        <dialog
            ref={props.ref}
            className="open:flex open:items-center open:justify-center w-full h-full p-0 border-none rounded-xl
             backdrop:bg-black/30 backdrop-blur-sm bg-transparent"            >
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Tem certeza que deseja apagar?
                </h2>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={props.simClick}
                        className={"button"}
                    >
                        Sim
                    </button>
                    <button
                        onClick={props.naoClick}
                        className={"button"}
                    >
                        Não
                    </button>
                </div>
            </div>
        </dialog>
    );
}

