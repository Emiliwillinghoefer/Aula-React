import type {PropsWithChildren} from "react";
import {NavigationBar} from "./NavigationBar.tsx";

export function MainLayout(props: PropsWithChildren) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black">
			<NavigationBar
				rotas={[
					{nome: "Cronometro", caminho: "/"},
					{nome: "Temporizador", caminho: "/temporizador"}]}/>
			{props.children}
		</div>
	)
}