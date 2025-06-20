import {Trash} from "phosphor-react";
import {useRef, useState} from "react";
import {Input} from "./Input.tsx";

interface AddNewToDoProps {
    addToDo: (id: string) => void;
    clearAllToDos: () => void;
    validateInput: (value: string) => boolean;

}

export function NewToDoForm(props: AddNewToDoProps) {
    const [inputInvalido, setInputInvalido] = useState("");
    const textInput = useRef<HTMLInputElement>(null);

    function clearNewText() {
        if (textInput.current != null) {
            textInput.current.value = "";
        }

    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const newText = textInput.current?.value ?? "";
        if (!props.validateInput(newText)) {
            setInputInvalido("Digite pelo menos 10 caracteres.");
            return;
        }
        props.addToDo(newText)
        clearNewText();
        setInputInvalido("");
    };

    return (
        <form onSubmit={handleSubmit}
              onReset={props.clearAllToDos}
        >
            <div className="relative">
                <Input ref={textInput} inputInvalido={inputInvalido} onChange={() => setInputInvalido("")}/>
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
        </form>)
}