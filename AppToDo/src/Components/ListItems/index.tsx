import {ListItem} from "./LisItem";
import type {ToDo} from "../../Models/ToDo.ts";
import {SearchInput} from "./SearchInput.tsx";
import {useSearchParams} from "wouter";
import {NotePencil} from "phosphor-react";

interface ListAllItemsProps {
    listToDos: ToDo[];
    deleteItem: (id: string) => void;
    updateToDo: (id: string, check: boolean) => void;
}

export function ListAllItems(props:ListAllItemsProps) {
    console.log("props", props);

    const [params, setParams] = useSearchParams();

    const busca = params.get("busca") || '';
    const checked = params.get ("checked" );

    const setBusca = (valor: string) =>
        setParams((params) => {
            if (valor) params.set("busca", valor);
            else params.delete("busca");
            return params;
    }, {replace: true});

    const setChecked = () =>
        setParams((params) => {
            if (params.get("checked") === "true") {
                params.delete("checked");
            } else {
                params.set("checked", "true");
            }
            return params;
        }, { replace: true });

    const setPendentes = () =>
        setParams((params) => {
            params.set("checked", "false");
            return params;
        }, { replace: true });

    const setTodos = () =>
        setParams((params) => {
            params.delete("checked");
            return params;
        }, { replace: true });

    const filtro = props.listToDos.filter((v) => {
        const buscaEscrita = v.text.toLowerCase().includes(busca.toLowerCase());

        const buscaChecados =
            checked === "true" ? v.checked === true :
                checked === "false" ? v.checked === false :
                    true;

        return buscaEscrita && buscaChecados;
    });

    return (
        <div>

            <div className="flex gap-2 mb-4 mt-4">
                <BotoesAcimaSearch
                    aoClicar={setTodos}
                    nom={"Ver Todos"}
                    ativo={checked === null}
                />
                <BotoesAcimaSearch
                    aoClicar={setChecked}
                    nom={"Finalizados"}
                    ativo={checked === "true"}
                />
                <BotoesAcimaSearch
                    aoClicar={setPendentes}
                    nom={"A fazer"}
                    ativo={checked === "false"}
                />
            </div>

            {
                filtro.length === 0 ? (
                    <div className="bg-[#f8f8f8] border border-gray-300 text-gray-600 p-6 rounded-xl items-center flex flex-col align-middle text-center mt-6">
                        <NotePencil size={32}  />
                        <h2 className="p-2"> Nenhum ToDo para mostrar. </h2>
                    </div>
                ) :(
                    <>
                        <SearchInput
                            valor={busca}
                            setValor={setBusca}
                        />
                        {
                            filtro.map(value => (
                                <ListItem
                                    {...value}
                                    key={value.id}
                                    onApagarClick={() => props.deleteItem(value.id)}
                                    onCheckBoxClick={(check) => props.updateToDo(value.id, check)}
                                />
                            ))
                        }
                    </>
                )

            }

        </div>
    )
}

function BotoesAcimaSearch(props:{nom:string, aoClicar: () => void, ativo: boolean}) {

    return (
        <button onClick={props.aoClicar}
                className={`rounded-2xl p-2 px-4 transition-colors 
                  ${props.ativo
                    ? "bg-[#E0F1F2] text-black"
                    : "bg-[#D8D9C8] text-black hover:bg-[#c0c2b0]"}`
                }
        >
            {props.nom}
        </button>
    )
}