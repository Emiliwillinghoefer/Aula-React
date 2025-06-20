
interface InputProps{
    ref: React.RefObject<HTMLInputElement | null>
    inputInvalido: string;
    onChange: () => void;
}


export function Input(props: InputProps) {
    return (<input ref={props.ref}
                   className={`bg-gray-400 w-full px-2 py-1 rounded
                        ${props.inputInvalido ? 'border border-red-500' : ''}`}

                   onChange={props.onChange}
    />
    )
}