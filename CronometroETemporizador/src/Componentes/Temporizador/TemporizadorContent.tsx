import {Tempo} from "./Tempo.tsx";
import {useTemporizadorAPI} from "../../store/useTemporizador.tsx";
import {Botao} from "../Botao.tsx";

export function TemporizadorContent() {
	const api = useTemporizadorAPI();

	return (
		<>
		<div className="flex flex-col items-center justify-center min-h-screen  bg-black">
			<div className="bg-[#131315] p-10 w-96 rounded shadow-lg flex flex-col items-center space-y-6 border-1 border-amber-50">
				<Tempo />
				<div className="flex w-40 flex-row items-center justify-between">
				<Botao
					estilo={"border-0 bg-purple-600 rounded p-2 text-white"}
					nome={"Iniciar"}
					aoClicar={api.iniciar}
				/>
				<Botao
					estilo={"border-0 bg-black rounded p-2 text-white"}
					nome={"Resetar"}
					aoClicar={api.resetar}/>
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
			<Botao estilo={"text-white border-1 border-amber-50 rounded p-2 "} nome={"5 minutos"} aoClicar={()=>api.definirTempo(300)}/>
			<Botao estilo={"text-white border-1 border-amber-50 rounded p-2 "} nome={"10 minutos"} aoClicar={()=>api.definirTempo(600)}/>
			<Botao estilo={"text-white border-1 border-amber-50 rounded p-2 "} nome={"15 minutos"} aoClicar={()=>api.definirTempo(900)}/>
		</div>
	)
}


