import {createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";

interface TemporizadorAPI{
    iniciar(): void;
    pausar(): void;
    resetar(): void;
    definirTempo(tpm: number): void;
}

const TemporizadorAPI = createContext<TemporizadorAPI>({} as TemporizadorAPI);
const TemporizadorTempo = createContext<number>(0);


export const useTemporizadorAPI = () => useContext(TemporizadorAPI);
export const useTemporizadorTempo = () => useContext(TemporizadorTempo);

export function CronometroProvider(props: PropsWithChildren) {

    const [tempo, setTempo] = useState(0);
    const [executando, setExecutando] = useState(false);

    const api = useMemo(() => {
        function iniciar() {
            setExecutando(true);
        }

        function pausar() {
            setExecutando(false);
        }

        function resetar() {
            setTempo(0);
            setExecutando(false);
        }

        function definirTempo(tpm: number) {
            setTempo(tpm);
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
                {props.children}
            </TemporizadorTempo>
        </TemporizadorAPI>
    )
}