import {useEffect, useState} from "react";

export function Cronometro() {

  const [tempo, setTempo] = useState(0);
  const [executando, setExecutando] = useState(false);

  function onIniciarClick() {
    setExecutando(true);
  }

  function onPausarClick() {
    setExecutando(false);
  }

  function onResetarClick() {
    setTempo(0);
    setExecutando(false);
  }

  useEffect(() => {
    if (executando) {
      const idIntervalo = setInterval(
          () =>
              setTempo(valor => valor + 1), 1);

      return () => clearInterval(idIntervalo);
    }
  }, [executando]);


  return (
      <div>
        <p>{tempo}</p>
        <button onClick={onIniciarClick}>Iniciar</button>
        <button onClick={onPausarClick}>Pausar</button>
        <button onClick={onResetarClick}>Resetar</button>
      </div>
  );
}

// ToDo : Função pausar.
// TODO: Tempo 00:00.00
// TODO: Estilizar

//TODO: Gravar tempo (LAP)   -----> https://quick-time-spark.lovable.app/

