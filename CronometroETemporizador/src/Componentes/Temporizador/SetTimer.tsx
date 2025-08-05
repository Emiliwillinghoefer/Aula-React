import {useEffect, useReducer, useState} from "react";
import {useTemporizadorAPI} from "../../store/useTemporizador.tsx";
import {Botao} from "../Botao.tsx";

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

	const api = useTemporizadorAPI();
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
			<div className="mt-5 bg-[#131315] p-5 w-full rounded shadow-lg flex flex-col  border-1 border-[#3F3F46]">
				<h1 className="font-bold text-white ">Set Timer</h1>
				<div className="w-full flex flex-row mt-3">
					<div className="flex flex-col pr-5">
						<p className="text-white">Minutos</p>
						<div className="w-full flex flex-row">

							<BotaoSetTimer nome={"+"} aoClicar={() => dispatchMinutos({type: "MAIS"})}></BotaoSetTimer>
							<InserirTempo
								tempo={inputMinutos}
								handleChange={handleChange}
								tipo={'m'}
							/>
							<BotaoSetTimer
								nome={"-"}
								aoClicar={() => dispatchMinutos({type: "MENOS"})}>
							</BotaoSetTimer>
							</div>
					</div>
					<div className="flex flex-col ">
						<p className="text-white">Segundos</p>
						<div className="w-full flex flex-row">

							<BotaoSetTimer nome={"+"} aoClicar={() => dispatchSegundos({type: "MAIS"})}></BotaoSetTimer>
							<InserirTempo
								tempo={inputSegundos}
								handleChange={handleChange}
								tipo={'s'}
							/>
							<BotaoSetTimer
								nome={"-"}
								aoClicar={() => dispatchSegundos({type: "MENOS"})}>
							</BotaoSetTimer>
						</div>
					</div>


				</div>
				<div className="mt-5 flex   ">
					<button className="bg-[#3F3F45]
					 m-1 text-white p-2 rounded-lg
					 justify-center w-full align-middle content-center border-2 border-[#3F3F46] "
							onClick={() => {
								const min = parseInt(inputMinutos, 10) || 0;
								const seg = parseInt(inputSegundos, 10) || 0;
								const total = min * 60 + seg;
								api.definirTempo(total);
							}}

					>
						Set Timer {inputMinutos}:{inputSegundos}
					</button>
				</div>
				<div className="mt-5">
					<h1 className="font-bold text-white p-2">Quick Set</h1>
					<TemposPreDefinidos/>
				</div>

			</div>
		</>)
}

function TemposPreDefinidos() {
	const api = useTemporizadorAPI();
	return (
		<div className="flex flex-row justify-between text-white">
			<Botao estilo={"text-white border-1 border-[#3F3F46] rounded p-2 "} nome={"1 minutos"} aoClicar={()=>api.definirTempo(60)}/>
			<Botao estilo={"text-white border-1 border-[#3F3F46] rounded p-2 "} nome={"5 minutos"} aoClicar={()=>api.definirTempo(300)}/>
			<Botao estilo={"text-white border-1 border-[#3F3F46] rounded p-2 "} nome={"10 minutos"} aoClicar={()=>api.definirTempo(600)}/>
			<Botao estilo={"text-white border-1 border-[#3F3F46] rounded p-2 "} nome={"15 minutos"} aoClicar={()=>api.definirTempo(900)}/>
		</div>
	)
}

function BotaoSetTimer(props: {nome: string, aoClicar: () => void}) {
	return (
		<div >
			<button className="bg-[#131315] m-1 text-white p-3 rounded-lg border-1 border-[#3F3F46]"
				onClick={props.aoClicar}>
				{props.nome}
			</button>
		</div>
	)
}

function InserirTempo(props: {tempo: any, handleChange: (e: any, tipo: string) => void, tipo: string}) {
	return (
		<input
			className="bg-[#131315] text-white p-3 items-center text-center rounded-lg border-1 border-[#3F3F46]"
			value={props.tempo}
			onChange={()=> props.handleChange(event, props.tipo)}

		/>
	)
}