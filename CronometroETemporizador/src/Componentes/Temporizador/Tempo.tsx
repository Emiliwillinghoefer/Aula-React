import {formatarTempo} from "../../utils/funcoesUteis.ts";
import {useTemporizadorProgresso, useTemporizadorTempo} from "../../store/useTemporizador.tsx";
import {ProgressRing} from "../ProgressRing.tsx";

export function Tempo() {
	const tempo = useTemporizadorTempo();
	const progresso = useTemporizadorProgresso();

	return (
		<div className="relative w-64 h-64">
			<ProgressRing progress={progresso} />

			<div className="absolute inset-0 flex items-center justify-center">
				<p className="text-5xl font-bold text-white">{formatarTempo(tempo)}</p>
			</div>
		</div>
	);
}