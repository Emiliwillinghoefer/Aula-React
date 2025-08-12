import {buscarToDos} from "@/api/toDoApi";
import {SearchInput} from "@/components/SearchInput";
import Home from "@/ui/Home";

export default async function ({
    searchParams}: {searchParams: Promise<{[key: string]: string | string[] | undefined}>} ) {

    const search = (await searchParams).query as string;
    const teste = await buscarToDos(search || "");

    console.log(await searchParams);
  return (
    <Home tarefas={teste} />
  );
}
