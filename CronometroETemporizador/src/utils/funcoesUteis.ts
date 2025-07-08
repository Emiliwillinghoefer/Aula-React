export function getCalculoTempo(totalMs: number) {
    const minutos = Math.floor(totalMs / 60000);
    const segundos = Math.floor((totalMs % 60000) / 1000);
    const centesimos = Math.floor((totalMs % 1000) / 10);

    const minStr = String(minutos).padStart(2, '0');
    const segStr = String(segundos).padStart(2, '0');
    const centStr = String(centesimos).padStart(2, '0');

    return `${minStr}:${segStr}.${centStr}`;
}

export function formatarTempo(tempo: number) {
    const minutos = Math.floor(tempo / 60);
    const segundosRestantes = tempo % 60;

    const minutosFormatados = String(minutos).padStart(2, '0');
    const segundosFormatados = String(segundosRestantes).padStart(2, '0');

    return `${minutosFormatados}:${segundosFormatados}`;
}

