import {Link} from "wouter";

export function NavigationBar(props: {rotas:{nome: string, caminho: string}[]}) {

	return(
		<nav>
			{props.rotas.map((valor) =>
				<Link href={valor.caminho}>{valor.nome}</Link>)
			}
		</nav>
	)

}