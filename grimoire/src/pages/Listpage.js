import { useParams } from "react-router-dom"
import { useOutletContext } from "react-router-dom"

export default function Listpage(){
    const {list_name} = useParams()
    const obj = useOutletContext()
    return (
        <>
            <p>{obj.user_name}</p>
            <p>{list_name} List</p>
        </>
    )
}