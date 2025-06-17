import type {RefObject} from "react";

interface DeleteDialogProps {
    ref: RefObject<HTMLDialogElement | null>;
    simClick: () => void;
    naoClick: () => void;
}

export function DeleteDialog(props: DeleteDialogProps) {
    return (
        <dialog ref={props.ref}>
            <button className={"button"} onClick={props.simClick}>Sim</button>
            <button className={"button"}
                    onClick={props.naoClick}
            >Não</button>
        </dialog>)
}