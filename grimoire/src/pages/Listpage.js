import { useParams } from "react-router-dom"

export default function Listpage(){
    const {list_name} = useParams()
    return (
        <p>{list_name} List</p>
    )
}