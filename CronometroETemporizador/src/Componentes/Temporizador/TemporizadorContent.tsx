import {Tempo} from "./Tempo.tsx";
import {useTemporizadorAPI, useTemporizadorExecutando, useTemporizadorTempo} from "../../store/useTemporizador.tsx";
import {Botao} from "../Botao.tsx";

export function TemporizadorContent() {
	useTemporizadorAPI();
	return (
		<>
		<div className="flex flex-col items-center justify-center min-h-screen  bg-black">
			<div className="bg-[#131315] p-10 w-96 rounded shadow-lg flex flex-col items-center space-y-6 border-1 border-amber-50">
				<Tempo />
				<div className="flex w-40 flex-row items-center justify-between">
				<Botoes />
				</div>
			</div>
			<div className="m-5 bg-[#131315] p-10 w-96 rounded shadow-lg flex flex-col  border-1 border-amber-50">
				<h1 className="font-bold text-white p-2">Quick Set</h1>
				<TemposPreDefinidos/>
			</div>
		</div>

</>	)
}

function TemposPreDefinidos() {
	const api = useTemporizadorAPI();
	return (
		<div className="flex flex-row justify-between text-white">
			<Botao estilo={"text-white border-1 border-amber-50 rounded p-2 "} nome={"5 minutos"} aoClicar={()=>api.definirTempo(10)}/>
			<Botao estilo={"text-white border-1 border-amber-50 rounded p-2 "} nome={"10 minutos"} aoClicar={()=>api.definirTempo(600)}/>
			<Botao estilo={"text-white border-1 border-amber-50 rounded p-2 "} nome={"15 minutos"} aoClicar={()=>api.definirTempo(900)}/>
		</div>
	)
}

function Botoes() {
	const api = useTemporizadorAPI();
	const executando = useTemporizadorExecutando();
	const tempo = useTemporizadorTempo();
	return (
		<div className="flex justify-center gap-4 mt-4">
			{executando && tempo > 0
				? <Botao estilo={"border-0 bg-yellow-500 rounded p-2 text-white"}
						 nome={"Pausar"}
						 aoClicar={api.pausar}
				/>
				: <Botao
					estilo={"border-0 bg-purple-600 rounded p-2 text-white"}
					nome={"Iniciar"}
					aoClicar={api.iniciar}
				/>
			}
			<Botao
				estilo={"border-0 bg-black rounded p-2 text-white"}
				nome={"Resetar"}
				aoClicar={api.resetar}/>
		</div>
	)
}

