export function Lap(props:{tempo:number}) {
    return (
        <div className="
    margin-top: 20px;
    padding-left: 10px;
    display: flex;
    border: 1px solid white;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;">
            <p>Lap</p>
            <p>{props.tempo}</p>
        </div>
    )
}