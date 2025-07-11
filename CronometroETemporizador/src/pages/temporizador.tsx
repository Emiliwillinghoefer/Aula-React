import {CronometroProvider} from "../store/useTemporizador.tsx";
import {TemporizadorContent} from "../Componentes/Temporizador/TemporizadorContent.tsx";
import {MainLayout} from "../Componentes/Layout/Main.tsx";

export function Temporizador() {
  return (
      <MainLayout>
          <CronometroProvider>
          <TemporizadorContent/>
          </CronometroProvider>
      </MainLayout>
      )

}
