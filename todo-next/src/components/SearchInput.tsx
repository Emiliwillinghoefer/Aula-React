import Form from "next/form";

export function SearchInput() {

	return (

		<Form action="/">
			<input
				name="query"
				placeholder={"Digite sua busca"}
				className={`bg-[#D8D9C8] text-black w-full px-2 py-2 rounded-xl p-4`}
			/>
			<button type="submit">Buscar</button>
		</Form>

	)
}