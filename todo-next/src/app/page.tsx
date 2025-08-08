import {buscarToDos} from "@/api/toDoApi";

export default async function Home() {

  const teste = await buscarToDos("");
  return (
    <div>
      {teste.map(value => value.text)}

      <div className="w-[60%] mx-auto items-center">
        <h1 className="text-[#efd1b9] text-5xl pb-5">App ToDo</h1>
        <p className="text-[#4A5565]">Mantenha-se organizado e faça as coisas</p>

      </div>

    </div>
  );
}
