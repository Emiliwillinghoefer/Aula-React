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

		<div className="mt-5 ">
			<input
				placeholder={"Digite sua busca"}
				className={`bg-[#D8D9C8] w-full px-2 py-2 rounded-xl p-4`}
				value={valorLocal}
				onChange={
					(e) => setValorLocal(e.target.value)}
			/>
		</div>
	)
}