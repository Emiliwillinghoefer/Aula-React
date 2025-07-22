import {useEffect, useReducer, useState} from "react";

const CounterLogic = (state: number, action: any) => {
	switch (action.type) {
		case 'MAIS':
			return state < 59 ? state + 1 : state;
		case 'MENOS':
			return state > 0 ? state - 1 : state;
		case "SET":
			const value = parseInt(action.payload, 10);
			if (isNaN(value)) return state;
			return  Math.min(Math.max(value, 0), 59);
		default:
			throw new Error("Erro");
	}

}


export function SetTimer() {
	const [minutos, dispatchMinutos] = useReducer(CounterLogic, 0);
	const [segundos, dispatchSegundos] = useReducer(CounterLogic, 0);


	const [inputMinutos, setInputMinutos] = useState("0");
	const [inputSegundos, setInputSegundos] = useState("0");


	useEffect(() => {
		setInputMinutos(minutos.toString());
	}, [minutos]);

	useEffect(() => {
		setInputSegundos(segundos.toString());
	}, [segundos]);

	function handleChange(e: any, tipo: string) {
		const value = e.target.value;

		if (value === "") {
			tipo === "m" ? setInputMinutos("") : setInputSegundos("");
			return;
		}

		const numericValue = parseInt(value, 10);
		if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 59) {
			if (tipo === "m") {
				setInputMinutos(value);
				dispatchMinutos({ type: "SET", payload: value });
			} else {
				setInputSegundos(value);
				dispatchSegundos({ type: "SET", payload: value });
			}
		}
	};

	return (
		<>
			<div className="mt-5 bg-[#131315] p-10 w-full rounded shadow-lg flex flex-col  border-1 border-amber-50">
				<h1 className="font-bold text-white p-2">Set Timer</h1>
				<div className="w-full flex flex-row">
					<div className="flex flex-col">
						<p className="text-white">Minutos</p>
						<div className="w-full flex flex-row">

							<Botao nome={"+"} aoClicar={() => dispatchMinutos({type: "MAIS"})}></Botao>
							<InserirTempo
								tempo={inputMinutos}
								handleChange={handleChange}
								tipo={'m'}
							/>
							<Botao
								nome={"-"}
								aoClicar={() => dispatchMinutos({type: "MENOS"})}>
							</Botao>
							</div>
					</div>
					<div className="flex flex-col">
						<p className="text-white">Segundos</p>
						<div className="w-full flex flex-row">

							<Botao nome={"+"} aoClicar={() => dispatchSegundos({type: "MAIS"})}></Botao>
							<InserirTempo
								tempo={inputSegundos}
								handleChange={handleChange}
								tipo={'s'}
							/>
							<Botao
								nome={"-"}
								aoClicar={() => dispatchSegundos({type: "MENOS"})}>
							</Botao>
						</div>
					</div>
				</div>

			</div>
		</>)
}


function Botao(props: {nome: string, aoClicar: () => void}) {
	return (
		<div >
			<button className="bg-[#131315] m-1 text-white p-3 rounded-full border-1 border-amber-50"
				onClick={props.aoClicar}>
				{props.nome}
			</button>
		</div>
	)
}

function InserirTempo(props: {tempo: any, handleChange: (e: any, tipo: string) => void, tipo: string}) {
	return (
		<input
			className="bg-[#131315] text-white p-3 items-center text-center rounded-full border-1 border-amber-50"
			value={props.tempo}
			onChange={()=> props.handleChange(event, props.tipo)}

		/>
	)
}