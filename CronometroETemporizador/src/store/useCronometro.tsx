import {createContext, type PropsWithChildren, useContext, useEffect, useMemo, useRef, useState} from "react";

interface CronometroAPI{
    iniciar(): void;
    pausar(): void;
    resetar(): void;
    lap(): void;
}

const CronometroAPI = createContext<CronometroAPI>({} as CronometroAPI);
const CronometroTempo = createContext<number>(0);
const CronometroExecutando = createContext<boolean>(false);
const Laps = createContext<number[]>([]);

export const useLaps = () => useContext(Laps);
export const useCronometroAPI = () => useContext(CronometroAPI);
export const useCronometroTempo = () => useContext(CronometroTempo);
export const useCronometroExecutando = () => useContext(CronometroExecutando);

export function CronometroProvider(props: PropsWithChildren) {
    const tempoRef = useRef(0);
    const [tempo, setTempo] = useState(0);
    const [executando, setExecutando] = useState(false);

    const [laps, setLap] = useState<number[]>([]);

    useEffect(() => {
        tempoRef.current = tempo
    }, [tempo]);

    const api = useMemo(() => {
        function iniciar() {
            setExecutando(true);
        }

        function pausar() {
            setExecutando(false);
        }

        function resetar() {
            setTempo(0);
            setLap([]);
            setExecutando(false);
        }

        function lap() {
            setLap((lapsAtuais) => {
                return [...lapsAtuais, tempoRef.current];
            });
        }

        return {iniciar, pausar, lap, resetar};
    }, []);

    useEffect(() => {
        if (executando) {
            const idIntervalo = setInterval(
                () =>
                    setTempo(valor => valor + 10), 10);

            return () => clearInterval(idIntervalo);
        }
    }, [executando]);

    return (
        <CronometroAPI value={api}>
            <CronometroExecutando value={executando}>
                <CronometroTempo value={tempo}>
                    <Laps value={laps}>
                        {props.children}
                    </Laps>
                </CronometroTempo>
            </CronometroExecutando>
        </CronometroAPI>
    )
}