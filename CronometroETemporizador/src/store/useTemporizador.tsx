import {createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";

interface TemporizadorAPI{
    iniciar(): void;
    pausar(): void;
    resetar(): void;
    definirTempo(tpm: number): void;
}

const TemporizadorAPI = createContext<TemporizadorAPI>({} as TemporizadorAPI);
const TemporizadorTempo = createContext<number>(0);
const TemporizadorExecutando = createContext<boolean>(false);
const TemporizadorProgresso = createContext<number>(0);


export const useTemporizadorAPI = () => useContext(TemporizadorAPI);
export const useTemporizadorTempo = () => useContext(TemporizadorTempo);
export const useTemporizadorExecutando = () => useContext(TemporizadorExecutando);
export const useTemporizadorProgresso = () => useContext(TemporizadorProgresso);

export function CronometroProvider(props: PropsWithChildren) {

    const [tempo, setTempo] = useState(0);
    const [executando, setExecutando] = useState(false);
    const [progresso, setProgresso] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(0);

    useEffect(() => {
        if (tempoTotal > 0) {
            const p = 1 - tempo / tempoTotal;
            setProgresso(p * 100);
        } else {
            setProgresso(0);
        }
    }, [tempo, tempoTotal]);

    const api = useMemo(() => {
        function iniciar() {
            setExecutando(true);
        }

        function pausar() {
            setExecutando(false);
        }

        function resetar() {
            setTempo(0);
            setTempoTotal(0);
            setExecutando(false);
        }

        function definirTempo(tpm: number) {
            setTempo(tpm);
            setTempoTotal(tpm)
            setExecutando(false);
        }

        return {iniciar, pausar, resetar, definirTempo};
    }, []);


    useEffect(() => {
        if (tempo > 0 && executando) {
            const idIntervalo = setInterval(
                () =>
                    setTempo(valor => valor - 1), 1000);

            return () => clearInterval(idIntervalo);
        }
    }, [tempo, executando]);
    return (
        <TemporizadorAPI value={api}>
            <TemporizadorTempo value={tempo}>
                <TemporizadorExecutando value={executando}>
                    <TemporizadorProgresso value={progresso}>
                        {props.children}
                    </TemporizadorProgresso>
                </TemporizadorExecutando>
            </TemporizadorTempo>
        </TemporizadorAPI>
    )
}