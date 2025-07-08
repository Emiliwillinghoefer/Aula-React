import {useCronometroTempo} from "../../store/useCronometro.tsx";
import {getCalculoTempo} from "../../utils/funcoesUteis.ts";

export function Tempo() {
    const tempo = useCronometroTempo();
    return (
        <div className="bg-black shadow shadow-purple-400 px-6 py-3 rounded">
            <p className="text-white text-3xl font-mono flex items-center justify-center">
                {getCalculoTempo(tempo)}
            </p>
        </div>
    );
}

