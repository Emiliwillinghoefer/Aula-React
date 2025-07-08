import {getCalculoTempo} from "../Tempo.tsx";

export function Lap(props:{tempo:number}) {
    return (
        <div className="w-full flex flex-row justify-between text-white" >
            <p>Lap</p>
            <p>{getCalculoTempo(props.tempo)}</p>
        </div>
    )
}