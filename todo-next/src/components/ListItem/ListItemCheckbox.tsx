"use client"
export function ListItemCheckbox(props: { checked: boolean, onCheckBoxClick: (check: boolean) => void}) {

	return (
		<input onChange={
			event => {
				props.onCheckBoxClick(!props.checked);
			}

		} type={"checkbox"}  checked={props.checked}
		/>
	)
}