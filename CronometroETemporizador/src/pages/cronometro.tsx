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







//TODO: Gravar tempo (LAP)   -----> https://quick-time-spark.lovable.app/
//TODO: Separar os arquivos
// Criar a tela de temporizador

