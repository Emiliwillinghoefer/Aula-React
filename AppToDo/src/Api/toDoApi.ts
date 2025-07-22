import type {ToDo} from "../Models/ToDo.ts";

const API_BASE = "http://localhost:8080"; // ou o IP do seu Quarkus se não estiver no mesmo PC

function frontToBackend(todo: ToDo): any {
	return {
		id: todo.id,
		description: todo.text,
		active: !todo.checked,
	};
}

// function backendToFront(todo: any): ToDo {
// 	return {
// 		id: todo.id,
// 		text: todo.description,
// 		checked: !todo.active,
// 	};
// }

export async function buscarToDos() {
	const res = await fetch(`${API_BASE}/view`);
	return await res.json();
}

export async function adicionarToDo(toDo: ToDo) {
	return await fetch("http://localhost:8080/todos/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(frontToBackend(toDo))
	});
}

export async function deletarToDo(id: string) {
	return await fetch(`${API_BASE}/delete/${id}`, {
		method: "POST"
	});
}

export async function atualizarToDo(toDo: { id: string, texto: string; feito: boolean }) {
	return await fetch(`${API_BASE}/update`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(toDo),
	});
}
