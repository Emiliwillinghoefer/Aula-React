import {formatarTempo} from "../../utils/funcoesUteis.ts";
import {useTemporizadorTempo} from "../../store/useTemporizador.tsx";

export function Tempo() {
	const tempo = useTemporizadorTempo();

	return (
			<div className="w-64 h-64 rounded-full bg-[#131315] shadow-inner border-4 border-[#1D1D20] flex items-center justify-center">
				<p className="text-5xl font-semibold text-white">
				{formatarTempo(tempo)}</p>
		</div>
	)
}