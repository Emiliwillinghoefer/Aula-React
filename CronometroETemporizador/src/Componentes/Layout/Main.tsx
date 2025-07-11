import type {PropsWithChildren} from "react";
import {NavigationBar} from "./NavigationBar.tsx";

export function MainLayout(props: PropsWithChildren) {
	return (
		<div>
			<NavigationBar rotas={[{nome: "Cronometro", caminho: "/"},
				{nome: "Temporizador", caminho: "/temporizador"}]}/>
			{props.children}
		</div>
	)
}