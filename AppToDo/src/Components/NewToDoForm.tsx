import {Plus, Trash} from "phosphor-react";
import {useRef, useState} from "react";
import {Input} from "./Input.tsx";
import {useToDos} from "../store/useToDos.tsx";
import {useClearToDos} from "../store/useClearToDos.tsx";



export function NewToDoForm() {
    const {addToDo, validateInput} = useToDos();
    const{clearAllToDos} = useClearToDos();

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
        if (!validateInput(newText)) {
            setInputInvalido("Digite pelo menos 10 caracteres.");
            return;
        }
        addToDo(newText)
        clearNewText();
        setInputInvalido("");
    };

    return (
        <form onSubmit={handleSubmit}
              onReset={clearAllToDos}
        className="mt-8 p-4 bg-[#d8d9c9] flex space-x-2  rounded-xl justify-center"
        >
            <div className="relative  flex-grow">
                <Input ref={textInput} inputInvalido={inputInvalido} onChange={() => setInputInvalido("")}/>
                <button className="absolute right-1 top-1 "
                        type="button"
                        onClick={clearNewText}
                ><Trash/></button>

                {inputInvalido && (
                    <p className="text-red-500 text-sm mt-1">{inputInvalido}</p>
                )}
            </div>
            <button className={"button "} type={"submit"}> <Plus/> Add </button>
            {/*<button className={"button"} type={"reset"}>Limpar ToDos</button>*/}
        </form>)
}