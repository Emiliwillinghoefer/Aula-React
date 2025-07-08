export function Botao(props: {estilo: string, nome: string, aoClicar: () => void}) {
    return (
        <div className={props.estilo}>
            <button onClick={() => props.aoClicar()}>
                {props.nome}
            </button>
        </div>
    )
}