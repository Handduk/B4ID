import { Item } from "./Item"

export type List = {
    id: number,
    name: string,
    isDone: boolean,
    items: Item[]
}