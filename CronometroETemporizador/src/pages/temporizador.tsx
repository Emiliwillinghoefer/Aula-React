import {CronometroProvider} from "../store/useTemporizador.tsx";
import {TemporizadorContent} from "../Componentes/Temporizador/TemporizadorContent.tsx";

export function Temporizador() {
  return (
          <CronometroProvider>
          <TemporizadorContent/>
          </CronometroProvider>
      )

}
