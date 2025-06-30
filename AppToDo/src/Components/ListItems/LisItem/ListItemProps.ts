import type {ToDo} from "../../../Models/ToDo.ts";

export interface ListItemProps extends ToDo {
    onApagarClick: () => void;
    onCheckBoxClick: (check:boolean) => void;
}