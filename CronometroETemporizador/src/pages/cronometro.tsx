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

const useCronometroAPI = () => useContext(CronometroAPI);
const useCronometroTempo = () => useContext(CronometroTempo);
const useCronometroExecutando = () => useContext(CronometroExecutando);

function CronometroProvider(props: PropsWithChildren) {
    const [tempo, setTempo] = useState(0);
    const [executando, setExecutando] = useState(false);

    const [laps, setLap] = useState<{ time: number }[]>([]);

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
            const newLap = {time};
            setLap([...laps, newLap]);
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
                    {props.children}
                </CronometroTempo>
            </CronometroExecutando>
        </CronometroAPI>
    )
}

export function Cronometro() {
    return (
        <CronometroProvider>
            <CronometroContent>
            </CronometroContent>
        </CronometroProvider>
    )
}

export function CronometroContent() {

    const executando = useCronometroExecutando();
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <div className="bg-[#121215] p-10 w-80  rounded shadow-lg flex flex-col items-center space-y-6">
                <Titulo/>
                <Tempo/>
                <div className="flex justify-center gap-4 mt-4">

                    {executando
                        ? <BotaoPausar />
                        : <BotaoIniciar />
                    }

                    {executando
                        ? <BotaoLap />
                        : null
                    }
                    <BotaoResetar/>
                </div>
            </div>
        </div>
    );
}

function getCalculoTempo(totalMs: number) {
    const minutos = Math.floor(totalMs / 60000);
    const segundos = Math.floor((totalMs % 60000) / 1000);
    const centesimos = Math.floor((totalMs % 1000) / 10);

    const minStr = String(minutos).padStart(2, '0');
    const segStr = String(segundos).padStart(2, '0');
    const centStr = String(centesimos).padStart(2, '0');

    return `${minStr}:${segStr}.${centStr}`;
}

function Tempo() {
    const tempo = useCronometroTempo();
    return (
        <div className="bg-black shadow shadow-purple-400 px-6 py-3 rounded">
            <p className="text-white text-3xl font-mono flex items-center justify-center">
                {getCalculoTempo(tempo)}
            </p>
        </div>
    );
}

function BotaoIniciar() {
    const api = useCronometroAPI();
    return (
        <div className="border-0 bg-purple-600 rounded p-2 text-white">
            <button
                onClick={api.iniciar}>
                Iniciar
            </button>
        </div>
    )
}

function BotaoPausar() {
    const api = useCronometroAPI();

    return (
        <div className="border-0 bg-purple-600 rounded p-2 text-white">
            <button onClick={api.pausar}>Pausar</button>
        </div>
    )
}

function BotaoResetar() {
    const api = useCronometroAPI();
    return (
        <div className="border-0 bg-black rounded p-2 text-white">
            <button onClick={api.resetar}>Resetar</button>
        </div>
    )
}

function BotaoLap() {
    const api = useCronometroAPI();
    const tempo = useCronometroTempo();
    return (
        <div className="border-0 bg-black rounded p-2 text-white">
            <button onClick={() => api.lap(tempo)}>Lap</button>
        </div>
    )
}

function Titulo() {
    return (
        <h1 className="text-white text-2xl font-semibold flex items-center justify-center">Stopwatch</h1>
    )
}

//TODO: Gravar tempo (LAP)   -----> https://quick-time-spark.lovable.app/
//TODO: Separar os arquivos
// Criar a tela de temporizador

