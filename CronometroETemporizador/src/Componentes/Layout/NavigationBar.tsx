import {Link, useLocation} from "wouter";

export function NavigationBar(props: {
	rotas: { nome: string, caminho: string }[]
}) {

	const [location] = useLocation()
	return (
		<div className="items-center justify-center rounded-md bg-black p-1
		 text-muted-foreground grid w-full grid-cols-2 mb-0 glass-card h-14 max-w-lg">
			{props.rotas.map((valor) =>
				<Link
					className={"text-white text-center rounded-md m-2 px-3 py-2" +
						(location == valor.caminho ? " bg-purple-700" : "bg-stone-900")
					}
					href={valor.caminho}
				>
					{valor.nome}
				</Link>)
			}
		</div>
	)

}