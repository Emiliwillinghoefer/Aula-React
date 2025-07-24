import {ListItem} from "./LisItem";
import type {ToDo} from "../../Models/ToDo.ts";
import {SearchInput} from "./SearchInput.tsx";
import {useSearchParams} from "wouter";

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
                    nom={"Ver Todos"}/>
                <BotoesAcimaSearch
                    aoClicar={setChecked}
                    nom={"Finalizados"}/>
                <BotoesAcimaSearch
                    aoClicar={setPendentes}
                    nom={"A fazer"}/>
            </div>

            <SearchInput
                valor={busca}
                setValor={setBusca}
            />
            {
                filtro.map(value  => {
                    return <ListItem {...value}
                                     key={value.id}
                                     onApagarClick={() => props.deleteItem(value.id)}
                                     onCheckBoxClick={(check)=> props.updateToDo(value.id, check)}
                    />
                })
            }

        </div>
    )
}

function BotoesAcimaSearch(props:{nom:string, aoClicar: () => void}) {

    return (
        <button className="bg-[#D8D9C8] rounded-2xl p-2 " onClick={props.aoClicar} >
            {props.nom}
        </button>
    )
}