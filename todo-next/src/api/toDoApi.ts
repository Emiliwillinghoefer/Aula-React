"use server"
import {ToDo} from "@/models/ToDo";
import {revalidateTag} from "next/cache";

const API_BASE = "https://api-7wrdwlysla-uc.a.run.app/";

export async function buscarToDos(busca: string): Promise<ToDo[]> {
    const res = await fetch(
        API_BASE + (busca ? "?busca=" + encodeURIComponent(busca) : ""), {next: {tags: ["todos"]}}
    );
    const json = await res.json();
    return  json.map((v: any) => ({...v, isServer: true}));
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

export async function atualizarToDo({id, ...toDo}: Partial<ToDo>) {

    const res = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toDo),
    });

    if (res.ok) {
        revalidateTag("todos");
    }
    return res;
}
