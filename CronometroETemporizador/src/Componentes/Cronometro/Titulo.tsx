export function Titulo(props: {titulo: string}) {
    return (
        <h1 className="text-white text-2xl font-semibold flex items-center justify-center">
            {props.titulo}
        </h1>
    )
}