import {Trash} from "phosphor-react";
import type {RefObject} from "react";

interface AddNewToDoProps {
    ref: RefObject<HTMLInputElement | null>
    inputInvalido: string;
    setInputInvalido: (inputInvalido: string) => void;
    clearNewText: () => void;

}

export function AddNewToDo(props: AddNewToDoProps) {
    return <div className="relative">
        <input ref={props.ref}
               className={`bg-gray-400 w-full px-2 py-1 rounded
                        ${props.inputInvalido ? 'border border-red-500' : ''}`}

               onChange={() => props.setInputInvalido("")}
        />
        <button className="absolute right-1 top-1"
                type="button"
                onClick={props.clearNewText}
        ><Trash/></button>

        {props.inputInvalido && (
            <p className="text-red-500 text-sm mt-1">{props.inputInvalido}</p>
        )}
    </div>
}