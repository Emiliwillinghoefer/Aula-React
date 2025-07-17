import {useDebounce} from "../../Hook/useDebounce.tsx";
import {useEffect, useState} from "react";


interface InputProps {
	valor: string;
	setValor: (valor: string) => void;
}


export function SearchInput(props: InputProps) {
	const [valorLocal, setValorLocal] = useState(props.valor);
	const debounced = useDebounce({valor: valorLocal});

	useEffect(() => {
		props.setValor(debounced);
	}, [debounced]);

	useEffect(() => {
		setValorLocal(props.valor);
	}, [props.valor]);

	return (

		<div className="m-4">
			<input
				placeholder={"Digite sua busca"}
				className={`bg-gray-400 w-full px-2 py-1 rounded`}
				value={valorLocal}
				onChange={
					(e) => setValorLocal(e.target.value)}
			/>
		</div>
	)
}