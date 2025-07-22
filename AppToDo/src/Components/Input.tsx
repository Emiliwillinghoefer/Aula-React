
interface InputProps{
    ref: React.RefObject<HTMLInputElement | null>
    inputInvalido: string;
    onChange: () => void;
}


export function Input(props: InputProps) {
    return (

           <input ref={props.ref}
                   className={`bg-[#f1f2e0] flex-grow border-amber-50 border-2 w-full px-2 py-2  rounded-xl
                        ${props.inputInvalido ? 'border border-red-500' : ''}`}
                   placeholder="O que precisa ser feito"
                   onChange={props.onChange}
            />

    )
}