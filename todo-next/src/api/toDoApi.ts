import {ToDo} from "@/models/ToDo";

const API_BASE = "https://api-7wrdwlysla-uc.a.run.app/SSPehHl4I24rfpFwyW4I";

export async function buscarToDos(busca: string): Promise<ToDo[]> {
    const res = await fetch(
        API_BASE + (busca ? "?busca=" + encodeURIComponent(busca) : "")
    );
    return await res.json();
}

export async function adicionarToDo(
    toDo: Omit<ToDo, "id">
): Promise<{ id: string }> {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDo),
    });
    return await res.json();
}

export async function deletarToDo(id: string) {
    return await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
    });
}

export async function atualizarToDo(toDo: Partial<ToDo>) {
    return await fetch(`${API_BASE}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDo),
    });
}
