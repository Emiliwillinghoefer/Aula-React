import {useCronometroTempo} from "../../store/useCronometro.tsx";

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

export function getCalculoTempo(totalMs: number) {
    const minutos = Math.floor(totalMs / 60000);
    const segundos = Math.floor((totalMs % 60000) / 1000);
    const centesimos = Math.floor((totalMs % 1000) / 10);

    const minStr = String(minutos).padStart(2, '0');
    const segStr = String(segundos).padStart(2, '0');
    const centStr = String(centesimos).padStart(2, '0');

    return `${minStr}:${segStr}.${centStr}`;
}