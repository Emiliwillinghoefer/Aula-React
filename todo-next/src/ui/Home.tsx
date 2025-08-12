import {ToDo} from "@/models/ToDo";
import {SearchInput} from "@/components/SearchInput";
import {ListAllItems} from "@/components";
import {atualizarToDo, deletarToDo} from "@/api/toDoApi";

interface HomeProps {
	tarefas: ToDo[];
}

export default function Home(props: HomeProps) {
	return (
		<div>
			{props.tarefas.map((tarefa, index) => (tarefa.text))}
			<div className="w-[60%] mx-auto items-center">
				<h1 className="text-[#efd1b9] text-5xl pb-5">App ToDo</h1>
				<p className="text-[#4A5565]">Mantenha-se organizado e faça as coisas</p>

			</div>
			<SearchInput/>
			<ListAllItems listToDos={props.tarefas}
						  deleteItem={async (id) => {
							  "use server"
							  await deletarToDo(id)
						  }}
						  updateToDo={async (id,checked) => {
							  "use server"
							  await atualizarToDo({id, checked})
						  }}
			/>
		</div>
	)
}