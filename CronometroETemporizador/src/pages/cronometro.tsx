import {CronometroContent} from "../Componentes/Cronometro/CronometroContent.tsx";
import {CronometroProvider} from "../store/useCronometro.tsx";
import {MainLayout} from "../Componentes/Layout/Main.tsx";



export function Cronometro() {
    return (
        <MainLayout>
            <CronometroProvider>
                <CronometroContent>
                </CronometroContent>
            </CronometroProvider>
        </MainLayout>
    )
}







//  -----> https://quick-time-spark.lovable.app/
// Criar a tela de temporizador

