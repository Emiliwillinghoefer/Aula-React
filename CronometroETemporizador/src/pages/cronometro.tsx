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
              setTempo(valor => valor + 10), 10);

      return () => clearInterval(idIntervalo);
    }
  }, [executando]);


  return (

      <div className="flex flex-col items-center justify-center h-screen bg-black">
          <div className="bg-[#121215] p-10 w-80  rounded shadow-lg flex flex-col items-center space-y-6">
              <Titulo/>
              <Tempo tempo={tempo}/>
              <div className="flex justify-center gap-4 mt-4">

              {executando
                  ? <BotaoPausar onPausarClick={onPausarClick}/>
                  : <BotaoIniciar onIniciarClick={onIniciarClick}/>
              }
              <BotaoResetar onResetarClick={onResetarClick}/>
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

function Tempo(props: { tempo: number }) {
    return (
        <div className="bg-black shadow shadow-purple-400 px-6 py-3 rounded">
            <p className="text-white text-3xl font-mono flex items-center justify-center">
                {getCalculoTempo(props.tempo)}
            </p>
        </div>
    );
}

function BotaoIniciar(props:{onIniciarClick:() => void}) {
    return (
        <div className="border-0 bg-purple-600 rounded p-2 text-white">
        <button
            onClick={props.onIniciarClick}>
            Iniciar
        </button>
        </div>
    )
}

function BotaoPausar(props:{onPausarClick:() => void}) {
    return(
        <div className="border-0 bg-purple-600 rounded p-2 text-white">
        <button onClick={props.onPausarClick}>Pausar</button>
        </div>
    )
}

function BotaoResetar(props:{onResetarClick:() => void}) {
    return (
        <div className="border-0 bg-black rounded p-2 text-white">
        <button onClick={props.onResetarClick}>Resetar</button>
        </div>
    )
}

function Titulo() {
    return (
        <h1 className="text-white text-2xl font-semibold flex items-center justify-center">Stopwatch</h1>
    )
}

//TODO: Gravar tempo (LAP)   -----> https://quick-time-spark.lovable.app/

