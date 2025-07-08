import {Lap} from "./Lap.tsx";
import {useLaps} from "../../../store/useCronometro.tsx";



export function ListAllLaps() {
    const lap = useLaps();
    return (
        <div>
            {
                lap.map(value  => {
                    return <Lap tempo={value} key={value}/>
                })
            }
        </div>
    )
}