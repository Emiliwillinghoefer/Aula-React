import {useEffect, useState} from "react";

export function useDebounce <T>({valor, tempo=300}: { valor: T, tempo?:number}) : T {
	const [valueDebounce, setValueDebounce] = useState(valor);

	useEffect(() => {
		const id = setTimeout(() => setValueDebounce(valor), tempo);
		return () => clearTimeout(id);
	}, [valor]);


	return valueDebounce;
}