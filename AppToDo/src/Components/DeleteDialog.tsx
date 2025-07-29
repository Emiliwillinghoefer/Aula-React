import { forwardRef } from "react";

interface DeleteDialogProps {
    simClick: () => void;
    naoClick: () => void;
}

export const DeleteDialog = forwardRef<HTMLDialogElement, DeleteDialogProps>(
    ({ simClick, naoClick }, ref) => {
        return (
            <dialog
                ref={ref}
                className="open:flex open:items-center open:justify-center w-full h-full p-0 border-none rounded-xl
             backdrop:bg-black/30 backdrop-blur-sm bg-transparent"            >
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Tem certeza que deseja apagar?
                    </h2>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={simClick}
                            className={"button"}
                        >
                            Sim
                        </button>
                        <button
                            onClick={naoClick}
                            className={"button"}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </dialog>
        );
    }
);

DeleteDialog.displayName = "DeleteDialog";
