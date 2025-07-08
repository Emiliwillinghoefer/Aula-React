import {createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState} from "react";

interface CronometroAPI{
    iniciar(): void;
    pausar(): void;
    resetar(): void;
    lap(tempo: number): void;
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
    const [tempo, setTempo] = useState(0);
    const [executando, setExecutando] = useState(false);

    const [laps, setLap] = useState<number[]>([]);

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

        function lap(time: number) {
            setLap((lapsAtuais) => {
                console.log("Lap", lapsAtuais);
                return [...lapsAtuais, time];
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