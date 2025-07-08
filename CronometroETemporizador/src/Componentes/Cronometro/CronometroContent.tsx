import {Botao} from "../Botao.tsx";
import {Tempo} from "./Tempo.tsx";
import {Titulo} from "./Titulo.tsx";
import {useCronometroAPI, useCronometroExecutando} from "../../store/useCronometro.tsx";
import {ListAllLaps} from "./Lap/ListAllLaps.tsx";

export function CronometroContent() {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-black">
            <div className="bg-[#121215] p-10 w-80 rounded shadow-lg flex flex-col items-center space-y-6">
                <Titulo titulo={"StopWatch"}/>
                <Tempo/>
                <Botoes/>

                <ListAllLaps/>
            </div>
        </div>
    );
}


function Botoes() {
    const api = useCronometroAPI();
    const executando = useCronometroExecutando();
    return (
        <div className="flex justify-center gap-4 mt-4">
            {executando
                ? <Botao estilo={"border-0 bg-purple-600 rounded p-2 text-white"}
                         nome={"Pausar"}
                         aoClicar={api.pausar}
                />
                : <Botao
                    estilo={"border-0 bg-purple-600 rounded p-2 text-white"}
                    nome={"Iniciar"}
                    aoClicar={api.iniciar}
                />
            }

            <BotaoLap />
            <Botao
                estilo={"border-0 bg-black rounded p-2 text-white"}
                nome={"Resetar"}
                aoClicar={api.resetar}/>
        </div>
    )
}

function BotaoLap() {
    const api = useCronometroAPI();
    const executando = useCronometroExecutando();
    if (!executando) return null;
    return (
        <Botao estilo={"border-0 bg-black rounded p-2 text-white"}
               nome={"Lap"}
               aoClicar={() => api.lap()}/>


    )
}