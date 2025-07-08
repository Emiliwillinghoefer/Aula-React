import {CronometroContent} from "../Componentes/Cronometro/CronometroContent.tsx";
import {CronometroProvider} from "../store/useCronometro.tsx";



export function Cronometro() {
    return (
        <CronometroProvider>
            <CronometroContent>
            </CronometroContent>
        </CronometroProvider>
    )
}







//  -----> https://quick-time-spark.lovable.app/
// Criar a tela de temporizador

